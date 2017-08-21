import React from "react"; 

import fire from '../fire.js';
import {Panel, Table, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button} from 'react-bootstrap'

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

const tableStyle = {"border":"rgba(0,255,0,.25) solid 1px","borderWidth":"0 0 0 5px","textAlign":"center","width":"300px"}

 
export default class EditCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {course:[
            {courseName:'',
            course_id:'',
            }] ,
            selCourseName:'somewhere Golf Club',
            selCourseId:''
        } 
        
        that=this
        
        
    }

    componentDidMount() {
        const btnSave=document.getElementById('btnSave')
        var dbRefCourse= dbRefCourses.orderByChild('Course_id')
        dbRefCourse.on('value' ,snap =>{
             console.log('Course data changing')
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
        console.log(name)
        that.setState({
           
            [name]: value});
       
      
    }
  
    handleSelect(eventKey) {
       console.log(eventKey)
       var key = eventKey
       if(eventKey<1){
           //get next player ID
            selKey = maxCourseId+1 //use the next available player ID
            //console.log('Next player ID:', selKey)
            that.setState({selCourseName: 'new course name', selCourseId:selKey})                      
        }
        else
        {
            console.log(eventKey)
            var dbRefCourse= dbRefCourses.orderByChild('Course_id').equalTo(eventKey);
            dbRefCourse.once('value').then(snap =>{
                     snap.forEach((child) => {
                     selKey=child.key
                     that.setState({selCourseId: child.val().Course_id, selCourseName: child.val().CourseName});
                    }) 
            //get hole data for selected course
            holes=[]
            pars =[]
            SIs =[]
            dbRefHoles.once('value').then(snap => {                            
                snap.forEach((child) =>{
                        //console.log(child.val(), that.state)
                      if(child.val().Course_ID===that.state.selCourseId){
                       var holeNum= child.val().Number
                       var par=child.val().PAR
                       var SI=child.val().SI
                       //console.log(holeNum,par,SI)
                       //holes.push=(<Hole number={holeNum} par={par} SI={SI}/>) 
                       holes.push(holeNum) 
                       pars.push(par) 
                       SIs.push(SI)                     
                                            
                   } 

            })
            console.log(holes,pars,SIs)
            that.forceUpdate()
           
        })
      })
    }

    }


    render () {
        
        var menuItems
        var courses = []
        var holeData = []
     
        for (var i=0; i<18; i++){
        holeData.push(<Hole number={holes[i]} par={pars[i]} SI={SIs[i]} />)
        }
        
   
             
        menuItems = that.state.course.map((course) => (
            <MenuItem eventKey={course.Course_id}>{course.Course_id} {course.CourseName} </MenuItem>))
            
            title = "Editing >"+that.state.selCourseName
    
        return (
           
           
            <div>
                <Panel bsStyle="primary" header ={title}>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Course" id="nav-dropdown">
                    <MenuItem eventKey="0">Add new course</MenuItem>
                    <MenuItem divider />
                    {menuItems}
                    </NavDropdown>
                </Nav>
                <Well>
                <input style = {{"width":"250px"}} type="text" name="selCourseName" value = {this.state.selCourseName} onChange={this.handleInputChange}/> <br/><br/>
                <Button bsStyle="primary" id="btnSave" onClick={this.handleSave}>Save</Button>
                </Well>
                <Well>
                    <Table responsive>
                        <thead>
                            <th>Hole Number</th>
                            <th>Par</th>
                            <th>Stroke Index</th>
                        </thead>
                        <tbody>
                           {holeData}
                        </tbody>
                    </Table>
                </Well>
                </Panel>
                </div> 

        );
    
    }
}

class Hole extends React.Component {

    render () {


        return (
            <div>       
         
                    <tr>
                    <td><input value={this.props.number}/></td>                             
                    <td><input value={this.props.par} /></td>
                     <td><input value={this.props.SI} /></td>
                 </tr>
           
            </div>
        )
    }
}
