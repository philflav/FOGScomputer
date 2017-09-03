import React from "react"; 

import {Panel, Well, Button, Nav, NavDropdown, NavItem,MenuItem} from 'react-bootstrap'

import fire from '../fire.js';
 
var dbRefComps = fire.database().ref().child('comp');
var dbRefPlayers = fire.database().ref().child('player');

var selCompName = ''
var selPlayer
var players = [] //array of competition record objects
var playerCount=1
var buttonItems
var link
const maxPlayers =12 //set the maximum nuber of players allowed

export default class Draw extends React.Component {
    constructor(props){
        super(props)
        this.state ={players: [],
        selPlayerName: 'no one'}
        
        selCompName='The draw for '+this.props.match.params.compName

        link='/'+this.props.match.params.compName
 
    //create buttons
    var nums = new Array(maxPlayers).join().split(',').map(function(item, index){ return ++index;})//fills an array of integers
    var ranNums = []
    var i = maxPlayers
    var j = 0

        while (i--) {
            j = Math.floor(Math.random() * (i+1));
            ranNums.push(nums[j]);
            nums.splice(j,1);
        }
       buttonItems = ranNums.map(function(i) {
        return (           
            <Button id={i} bsStyle="success" bsSize="large" onClick={this.handleButtonClick.bind(this, i)} block >
              ????
            </Button>                     
            );    }, this)
       
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
                                players.push({competitorKey: child.key, player_id: child.val().player_id, draw: child.val().draw, playerName: child1.val().forename+' '+child1.val().surname, enabled: true})
                                if(child.val().draw>0){
                                var selectedButton = document.getElementById(child.val().draw);
                                if(selectedButton){
                                selectedButton.setAttribute('disabled', true)
                                selectedButton.innerHTML= child1.val().forename +' '+ child1.val().surname+' drew '+ child.val().draw}
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

    handleButtonClick (i,event) {  //draw button clicked
        var selectedButton = document.getElementById(i);
        selectedButton.setAttribute('disabled', true)
        var update ={draw: i}
        console.log(players[selPlayer].competitorKey, update)
        fire.database().ref('/comp/'+players[selPlayer].competitorKey).update(update)
        .catch(e =>{
         console.log(e)
        })
        .then(
            selectedButton.innerHTML= players[selPlayer].playerName + ' drew '+ i,
            this.setState({selPlayerName: 'no one'}),
            players[selPlayer].competitorKey='',
            players[selPlayer].enabled= false //stops player drawing multiple times
                       
        )


    }

    handleMenuSelect(eventKey){  //comp database reference to player selected

        selPlayer = eventKey
        console.log(selPlayer)
        this.setState({selPlayerName: players[eventKey].playerName})
        



    }

    
    render () {
        var menuItems =[]
        var plist = []
        plist=this.state.players
        menuItems = plist.map((player, index) => {
            var mindex='M'+index
            if(!player.draw){
                return  <MenuItem id={mindex} eventKey={index} disabled={!player.enabled}>{player.playerName}</MenuItem>
            } 
        })

        return (
            <div>
                 <Panel bsStyle="primary" header= {selCompName}>
                     <h2>Drawing {this.state.selPlayerName}</h2>
                 <Nav bsStyle="tabs" activeKey="1" >
                     <NavItem href={link}> Teams/Groups </NavItem>
                    <NavDropdown onSelect={this.handleMenuSelect.bind(this)} eventKey="999" title="Select Player to Draw" id="nav-dropdown">
                        {menuItems}
                    </NavDropdown>
                </Nav>
                 <Well>
                 {buttonItems}
                 </Well>
                 </Panel>

            </div>

        );
    }	
    
}

	


