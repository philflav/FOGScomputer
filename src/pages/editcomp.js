import React from "react"


import fire from '../fire.js'

import {Panel, Table, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button, Grid, Col, Row} from 'react-bootstrap'

var dbRefCompNames = fire.database().ref().child('compNames');
var maxCompId = 0
var menuItems = []
var complist = []
var namelist = []
var title, that

export default class EditComp extends React.Component {

    constructor(props){
        super(props)

        this.state = {comps: [
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
        
            that=this    
         console.log(this.state)
    }

    
    componentDidMount() {

        var dbRefCompName= dbRefCompNames.orderByChild('name')
        dbRefCompName.on('value' ,snap =>{
            snap.forEach((child) => {
            complist.push(child.val(), {ref: child.ref})
            that.setState({comps: complist})
   
                })
 
        })
            


        
    }
    

    //get a list of comp names and players

render () {

       menuItems = that.state.comps.map((comp) => (
            console.log(comp),
            <MenuItem eventKey={comp.ref}>{comp.name} </MenuItem>))
    

return(

    <div>


                <Panel bsStyle="primary" header = "Competition Editor">
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Competition" id="nav-dropdown">
                    <MenuItem> Start New Comp</MenuItem>
                    <MenuItem divider />
                    {menuItems}
                    </NavDropdown>
                </Nav>
                <Grid>
                    <Row>
                <Col md={6}>
                <Well />
                </Col>
                <Col md={6}>
                <Well />
                </Col>
                    </Row>
                </Grid>
                </Panel>

   
    </div>
)
}

}