import React from "react"; 

import {Panel, Well, Button, Nav, NavDropdown, NavItem,MenuItem} from 'react-bootstrap'

import fire from '../fire.js';
 
var dbRefComps = fire.database().ref().child('comp');
var dbRefPlayers = fire.database().ref().child('player');

var selCompName = ''
var players = [] //array of competition record objects
var playerCount=1
var link
const maxPlayers =12 //set the maximum nuber of players allowed

export default class Draw extends React.Component {
    constructor(props){
        super(props)
        this.state ={players: []}
        selCompName='The draw for '+this.props.match.params.compName

        link='/'+this.props.match.params.compName
    }

    componentWillMount(){

        //get competion players

        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.props.match.params.compName);

        dbRefComp.once('value').then(snap => {
                    playerCount=snap.numChildren()
                    snap.forEach((child) => { 
                        var dbRefPlayer= dbRefPlayers.orderByChild('player_id').equalTo(child.val().player_id);
                        dbRefPlayer.once('value').then(snap =>{
                            snap.forEach((child1) => {
                                players.push({competitorRef: child.ref, player_id: child.val().player_id, draw: child.val().draw, playerName: child1.val().forename+' '+child1.val().surname})
                                if(child.val().draw){
                                var selectedButton = document.getElementById(child.val().draw);
                                selectedButton.setAttribute('disabled', true)
                                selectedButton.innerHTML= child1.val().forename +' '+ child1.val().surname+' drew '+ child.val().draw
                                }
                                })
                                this.setState({players: players})
                            })
                        })
                        for(var j=playerCount+1;j<maxPlayers+1;j++){
                        var selectedButton = document.getElementById(j)
                        selectedButton.remove()
                    }
                    })                 
                    console.log(players)
                

        //test for draw already performed
        //if yes simply display the draw 

        //if no do the draw and update the competion details

    }

    handleClick (i,event) {  //draw button clicked
        var selectedButton = document.getElementById(i);
        selectedButton.setAttribute('disabled', true)
        selectedButton.innerHTML= i + ' not drawn'   
    }

    handleSelect(eventKey){  //player selected

        alert(eventKey)

    }


    
    render () {
        var nums = new Array(maxPlayers).join().split(',').map(function(item, index){ return ++index;})//fills an array of integers
        var ranNums = []
        var i = maxPlayers
        var j = 0
    
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
                ranNums.push(nums[j]);
                nums.splice(j,1);
    }
        var items = ranNums.map(function(i) {
            return (
               
                <Button id={i} bsStyle="success" bsSize="large" onClick={this.handleClick.bind(this, i)} block >
                  ????
                </Button>
              
                
                );
        }, this)

        var menuItems
        var plist = []
        plist=this.state.players
      
        menuItems = plist.map((player) => (
        <MenuItem eventKey={player.player_id}>{player.player_id} {player.playerName} </MenuItem>))

        return (
            <div>
                 <Panel bsStyle="primary" header= {selCompName}>
                 <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                     <NavItem href={link}> Teams/Groups </NavItem>
                    <NavDropdown eventKey="999" title="Select Player to Draw" id="nav-dropdown">
                        {menuItems}
                    </NavDropdown>
                </Nav>
                 <Well>
                 {items}
                 </Well>
                 </Panel>

            </div>

        );
    }	
    
}

	


