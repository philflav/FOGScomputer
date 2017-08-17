import React from "react"; 

import fire from '../fire.js';
import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'

var dbRefPlayers = fire.database().ref().child('player');

var that
var playerList = []
 
export default class EditPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {players:[
            {c_hcap:'',
            email:'',
            forename:'',
            mobile:'',
            player_id:'',
            surname:''}] }  
        that=this
    }

    componentDidMount() {
        var dbRefPlayer= dbRefPlayers.orderByChild('player_id')
        dbRefPlayer.once('value').then(snap =>{
            // console.log(snap.val())
             snap.forEach((child) => {
             playerList.push(child.val())
             })
             console.log(playerList)
             this.setState({players: playerList})
    })
}
  
    handleSelect(eventKey) {
       console.log(eventKey)
       var key = eventKey
       if(eventKey<1){
            alert('Create new player')
        }
        else
        {
            alert("Edit player "+key)
        }
      }

    render () {
        
        var menuItems
        var players = []
        console.log(this.state) 
        players=this.state.players
      
        menuItems = players.map((player) => (
        <MenuItem eventKey={player.player_id}>{player.player_id} {player.forename} {player.surname} </MenuItem>))
            
        
    
        return (

            <div>
                <h3>Player Details</h3>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Player" id="nav-dropdown">
                    <MenuItem eventKey="0">Add new player</MenuItem>
                    <MenuItem divider />
                    {menuItems}

                    </NavDropdown>
                </Nav>
                </div>

        );
    
    }
}
