import React from "react"; 

import fire from '../fire.js';
import {Panel, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button} from 'react-bootstrap'

var dbRefCourses = fire.database().ref().child('course');

var that
var courseList = []
var selKey
var maxCourseId = 0

 
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
       // this.handleInputChange = this.handleInputChange.bind(this); 

    }

    componentDidMount() {
        const btnSave=document.getElementById('btnSave')
        var dbRefCourse= dbRefCourses.orderByChild('Course_id')
        dbRefCourse.once('value').then(snap =>{
            // console.log(snap.val())
             snap.forEach((child) => {
             courseList.push(child.val())
             if(maxCourseId<child.val().Course_id){
             maxCourseId=child.val().Course_id
             }
             })
             //console.log(playerList)
             this.setState({course: courseList})
             //Add realtime Listner

             fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
            console.log(firebaseUser)
            btnSave.classList.remove('hide')
    
            }else{
            console.log('not logged in')
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
            })
        }
      }


    render () {
        
        var menuItems
        var courses = []
        courses=this.state.course
      
        menuItems = courses.map((course) => (
            <MenuItem eventKey={course.Course_id}>{course.Course_id} {course.CourseName} </MenuItem>))
            
        
    
        return (

            <div>
                <Panel bsStyle="primary" header = "CourseName">
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
                    Hole by hole details here
                </Well>
                </Panel>
                </div> 

        );
    
    }
}
