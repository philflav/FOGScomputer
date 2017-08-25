import React from "react"; 

import fire from '../fire.js';
import {Panel, Table, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button, Col} from 'react-bootstrap'

import Hole from './hole.js'

var dbRefCourses = fire.database().ref().child('course');
var dbRefHoles = fire.database().ref().child('hole');

var that
var courseList = []
var selKey
var maxCourseId = 0
var title
var holes = []
var pars = []
var SIs =[]
var holeKeys= []

const tableStyle = {"border":"rgba(0,255,0,.25) solid 1px","borderWidth":"0 0 0 5px","textAlign":"center","width":"150px"}

 
export default class EditCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {course:[
            {courseName:'',
            course_id:'',
            }] ,
            selCourseName:'not selected!',
            selCourseId:'',
            par:'' ,
            SI:'' ,
            key:''
        } 
        
        that=this
        console.log(this.state)
        
    }

    componentDidMount() {
        const btnSave=document.getElementById('btnSave')
        var dbRefCourse= dbRefCourses.orderByChild('Course_id')
        dbRefCourse.on('value' ,snap =>{
             //console.log('Course data changing')
             snap.forEach((child) => {
             courseList.push(child.val())
             if(maxCourseId<child.val().Course_id){
             maxCourseId=child.val().Course_id
             this.setState({course: courseList})
             }
             })
             //console.log(playerList)
             
             //Add realtime Listner

             fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
            //console.log(firebaseUser)
            btnSave.classList.remove('hide')
    
            }else{
            //console.log('not logged in')
            btnSave.classList.add('hide')
            }
        })
        
    })
    }
    
    handleSave(event){
        console.log('Saving course details')
        var update={Course_id: that.state.selCourseId, CourseName: that.state.selCourseName}
        console.log(update)
        fire.database().ref('/course/'+selKey).update(update)
            .catch(e =>{
                console.log(e)
            })
        
       
    }
   

    handleInputChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        console.log(target)
        that.setState({
           
            [name]: value});
       
      
    }
   
  
    handleSelect(eventKey) {
       //console.log(eventKey)
       var key = eventKey
       if(eventKey<1){
           //get next player ID
            selKey = maxCourseId+1 //use the next available player ID
            //console.log('Next player ID:', selKey)
            that.setState({selCourseName: 'new course name', selCourseId:selKey})                      
        }
        else
        {
            //console.log(eventKey)
            var dbRefCourse= dbRefCourses.orderByChild('Course_id').equalTo(eventKey);
            dbRefCourse.once('value').then(snap =>{
                     snap.forEach((child) => {
                     selKey=child.key
                     that.setState({selCourseId: child.val().Course_id, selCourseName: child.val().CourseName});
                    }) 
            //get holes data for selected course
            holes=[]
            pars =[]
            SIs =[]
            holeKeys = []
            that.setState({
                par: pars,
                SI: SIs,
                key: holeKeys 
               })
            dbRefHoles.once('value').then(snap => {                            
                snap.forEach((child) =>{
                    //console.log(child.val(), that.state)
                      if(child.val().Course_ID===that.state.selCourseId){
                       var holeNum= child.val().Number
                       var par=child.val().par
                       var SI=child.val().SI
                       var key=child.key

                       holes.push(holeNum) 
                       pars.push(par) 
                       SIs.push(SI) 
                       holeKeys.push(key)
                      
                      }
                    })
     
                       that.setState({
                        par: pars,
                        SI: SIs,
                        key: holeKeys 
                       })
                       console.log("Before render :",that.state)

            })
                   
        })
      
    }

    }


    render () {
        
        var menuItems
        var courses = []
        var holeData = []        


        for(var i=0; i<18; i++){
        //    console.log(that.state.par[i],that.state.SI[i])
        if(that.state.key[i]){
        holeData.push(<Hole number={i}  hkey={that.state.key[i]} par={that.state.par[i]} SI={that.state.SI[i]}/>)
        }
        //console.log('Hole :',holeData)
        }
               
   
             
        menuItems = that.state.course.map((course) => (
            <MenuItem eventKey={course.Course_id}>{course.Course_id} {course.CourseName} </MenuItem>))
            
            title = "Editing >"+that.state.selCourseName
            
    
        return (
           
           
            <div>
                <Panel bsStyle="primary" header ={title}>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Course" id="nav-dropdown">
                    {menuItems}
                    </NavDropdown>
                </Nav>

                <Well>
                <input style = {{"width":"250px"}} type="text" name="selCourseName" value = {this.state.selCourseName} onChange={this.handleInputChange}/>    <Button bsStyle="primary" id="btnSave" onClick={this.handleSave}>Save Name</Button>
                </Well>
                <Well >
                    <div>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th style={{"width":"25px"}}>#</th>
                            <th style={{"width":"25px"}}>Par</th>
                            <th style={{"width":"25px"}}>SI</th>
                            <th style={{"width":"25px"}}> </th>
                        </tr>
                        </thead>
                        <tbody>
                        {holeData}
                        </tbody>
                    </Table>
                    </div>
                </Well>
                </Panel>
                </div> 

        )
    
    }
}

