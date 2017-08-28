import React from "react"


import fire from '../fire.js'

import {Panel, Table, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button, Grid, Col, Row} from 'react-bootstrap'

var dbRefCompNames = fire.database().ref().child('compNames');
var dbRefPlayers = fire.database().ref().child('player')
var dbRefComps = fire.database().ref().child('comp')
var dbRefCourses = fire.database().ref().child('course')
var maxCompId = 0
var menuItems = []
var complist = []
var namelist = []
var title, that
var selectedComp
var courseList, playerList
var compPlayers =[]
var compCourses =[]

export default class EditComp extends React.Component {

    constructor(props){
        super(props)

        this.state = {title: 'Competition not selected',
            players: [],
            courses: ["not defined", "not defined", "not defined", "not defined"],
            comps: [
            {comp_id: '',
            payer_id: '',
            course_id1: '',
            course_id2: '',
            course_id3: '',
            course_id4: '',
            draw: '',
            hlocal: '',
            name: '',
            }]
        }
        this.handleSelect = this.handleSelect.bind(this);
            that=this    
          }

    
    componentWillMount() {

        var dbRefCompName= dbRefCompNames.orderByChild('name')
        dbRefCompName.on('value' ,snap =>{
            snap.forEach((child) => {
            complist.push(child.val(), {ref: child.ref})
            this.setState({comps: complist})
   
                })
 
        })
    
    }

    componentDidUpdate(prevProps, prevState) {

    }
    

    componentWillUpdate(nextProps, nextState) {

        
        courseList = nextState.courses.map((course) =>(
            <li>{course}</li>
        ))

        playerList = nextState.players.map(function(player,index) {
            if(index===3|index===6|index===9){
                return (<div><hr /><li>{player.playername}</li></div>)
            }else{
                return (<div><li>{player.playername}</li></div>)
            }
        })
        
    }
    

    handleSelect(eventKey){

        var key=eventKey
                compPlayers=[]
        compCourses=[]
        if(eventKey<1) {
            console.log('Create new competition')
        }
        else
        {
            selectedComp=eventKey
            var title="Editing > "+ selectedComp
            that.setState({title: title})
            var needCourseNames = true

            //now get list of entrants for the selected competiton
            var dbRefComp=dbRefComps.orderByChild('name').equalTo(selectedComp)
            dbRefComp.once('value').then( snap =>{
                snap.forEach((child) => {
                    dbRefPlayers.orderByChild('player_id').equalTo(child.val().player_id).on('value' , snap=>{
                        snap.forEach((child2 ) =>{
                        compPlayers.push({
                            playername: child2.val().forename+' '+child2.val().surname,
                            draw: child.val().draw
                                })
                            })
                            compPlayers.sort(function (a, b) {
                                return a.draw - b.draw;
                                    }); 
                            this.setState({players: compPlayers}) 
                         })
                    if(needCourseNames){ //just get courenames once
                        
                    dbRefCourses.orderByChild('Course_id').equalTo(child.val().course1_id).on('value' , snap=>{
                        snap.forEach((child3) =>{
                            compCourses.push(
                                child3.val().CourseName
                            )
                        })
                        this.setState({courses: compCourses})
                    }) 
                    dbRefCourses.orderByChild('Course_id').equalTo(child.val().course2_id).on('value' , snap=>{
                        snap.forEach((child3) =>{
                            compCourses.push(
                                child3.val().CourseName
                            )
                        })
                        this.setState({courses: compCourses})
                    })
                    dbRefCourses.orderByChild('Course_id').equalTo(child.val().course3_id).on('value' , snap=>{
                        snap.forEach((child3) =>{
                            compCourses.push(
                                child3.val().CourseName
                            )
                        })
                        this.setState({courses: compCourses})
                    })
                    dbRefCourses.orderByChild('Course_id').equalTo(child.val().course4_id).on('value' , snap=>{
                        snap.forEach((child3) =>{
                            compCourses.push(
                                child3.val().CourseName
                            )
                        })
                        this.setState({courses: compCourses})
                    })
                    needCourseNames = false
                    }                           
                    })                          
             
                })
                    
            
        }


    }

   

render () {

       menuItems = this.state.comps.map((comp) => (
            
            <MenuItem eventKey={comp.name}>{comp.name} </MenuItem>))            
        

return(
                
    <div>


                <Panel bsStyle="primary" header = {this.state.title}>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Competition" id="nav-dropdown">
                    <MenuItem eventKey='0'> Start New Comp</MenuItem>
                    <MenuItem divider />
                    {menuItems}
                    </NavDropdown>
                </Nav>
                <Grid>
                    <Row>
                      <Col md={6}>
                         <Well>
                             <h3>Courses</h3>
                             <ol>
                             {courseList}
                             </ol>
                        </Well>
                </Col>
                <Col md={6}>
                        <Well>
                            <h3>Players/Teams</h3>
                            <ul>
                            {playerList}
                            </ul>
                        </Well>
                </Col>
                    </Row>
                </Grid>
                </Panel>

   
    </div>
)
}

}