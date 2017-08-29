import React from "react"


import fire from '../fire.js'

import PlayOrder from './playorder.js'

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
var selectMode //should competiotn slect be enabled
var courseList, playerList, Day1List, Day2List, Day3List, Day4List
var compPlayers =[]
var compCourses =[]

export default class EditComp extends React.Component {

    constructor(props){
        super(props)

        this.state = {title: 'Competition not selected',
            compName: this.props.match.params.compName,
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
        if(this.state.compName){
            this.state.title=this.state.compName
        }
        this.handleSelect = this.handleSelect.bind(this);
            that=this    
          }

    
    componentWillMount() {

        if(this.state.compName){
            this.handleSelect(this.state.compName)
            selectMode=true
        }
        
        else
        {
        selectMode=false
        var dbRefCompName= dbRefCompNames.orderByChild('name')
        dbRefCompName.on('value' ,snap =>{
            snap.forEach((child) => {
            complist.push(child.val(), {ref: child.ref})
            this.setState({comps: complist})
   
                })
 
        })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }
    

    componentWillUpdate(nextProps, nextState) {

        
        courseList = nextState.courses.map((course) =>(
           <li>{course}</li>
        ))

        playerList = nextState.players.map(function(player,index) {

            if(index===2|index===5|index===8|index===11){
                return (<div><li>{player.playername}<hr /></li></div>)
            }else {
                return (<div><li>{player.playername}</li></div>)
            }
        })
        Day1List  =<h3>to be completed sometime</h3>
        Day2List = Day1List
        Day3List = Day2List
        Day4List = Day3List
                
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
                            draw: child.val().draw,
                            playerId: child.val().player_id
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
                    <NavDropdown eventKey="999" title="Select Competition" id="nav-dropdown" disabled={selectMode}>
                    <MenuItem eventKey='0'> Start New Comp</MenuItem>
                    <MenuItem divider />
                    {menuItems}
                    </NavDropdown>
                </Nav>
                <Grid>
                    <Row>
                      <Col md={3}>
                         <Well>
                             <h3>Courses</h3>
                             <ol>
                             {courseList}
                             </ol>
                        </Well>
                </Col>
                <Col md={3}>
                        <Well>
                            <h3>Players/Teams</h3>
                            <ul>
                            {playerList}
                            </ul>
                        </Well>
                        </Col>
                <Col md={6}>
                        <Well>
                        <h3>Playing Groups</h3>
                        <Well>

                            <PlayOrder day='1' players={this.state.players} />
                       
                        </Well>
                        <Well>

                            <PlayOrder day='2' players={this.state.players} />

                        </Well>
                        <Well>

                            <PlayOrder day='3' players={this.state.players} />

                        </Well>
                        <Well>

                            <PlayOrder day='4' players={this.state.players} />

                        </Well>
                        </Well>
                </Col>
                    </Row>
                </Grid>
                </Panel>

   
    </div>
)
}

}