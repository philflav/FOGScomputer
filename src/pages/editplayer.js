import React from "react"; 

import fire from '../fire.js';
import {Panel, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button} from 'react-bootstrap'

var dbRefPlayers = fire.database().ref().child('player');

var that
var playerList = []
var selKey

 
export default class EditPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {players:[
            {c_hcap:'',
            email:'',
            forename:'',
            mobile:'',
            player_id:'',
            surname:''}] ,
            selforename:'Fred',
            selsurname:'Bloggs',
            selhandicap:28,
            selmobile:'12345',
            selemail:'fred@bloggs.com'
        } 
        
        that=this
       // this.handleInputChange = this.handleInputChange.bind(this); 

    }

    componentDidMount() {
        const btnSave=document.getElementById('btnSave')
        var dbRefPlayer= dbRefPlayers.orderByChild('player_id')
        dbRefPlayer.once('value').then(snap =>{
            // console.log(snap.val())
             snap.forEach((child) => {
             playerList.push(child.val())
             })
             console.log(playerList)
             this.setState({players: playerList})
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
        console.log('Saving player details')
        var update={player_id: that.state.selplayerId, forename: that.state.selforename, surname: that.state.selsurname, mobile: that.state.selmobile, email: that.state.selemail, c_hcap: that.state.selhandicap}
        console.log(update)
        fire.database().ref('/player/'+selKey).update(update)
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
            that.setState({selforename:'Bill'})
        }
        else
        {
            var dbRefPlayer= dbRefPlayers.orderByChild('player_id').equalTo(eventKey);
            dbRefPlayer.once('value').then(snap =>{
                     snap.forEach((child) => {
                        selKey=child.key
                     that.setState({selplayerId: child.val().player_id, selforename: child.val().forename, selsurname: child.val().surname, selemail: child.val().email, selmobile:child.val().mobile, selhandicap:child.val().c_hcap, fullname: child.val().forename+' '+child.val().surname});
                     }) 
            })
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
                <Panel bsStyle="primary" header = {this.state.fullname}>
                <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                    <NavDropdown eventKey="999" title="Select Player" id="nav-dropdown">
                    <MenuItem eventKey="0">Add new player</MenuItem>
                    <MenuItem divider />
                    {menuItems}
                    </NavDropdown>
                </Nav>
                <Well>
                <input style = {{"width":"100px"}} type="text" name="selforename" value = {this.state.selforename} onChange={this.handleInputChange}/>                <input style = {{"width":"100px"}} type="text" name="selsurname" value = {this.state.selsurname} onChange={this.handleInputChange}/> Handicap: <input style = {{"width":"40px"}} type="text" name="selhandicap" value = {this.state.selhandicap} onChange={this.handleInputChange}/> Mobile: <input style = {{"width":"12 0px"}} type="text" name="selmobile" value = {this.state.selmobile} onChange={this.handleInputChange}/> eMail: <input style = {{"width":"200px"}} type="text" name="selemail" value = {this.state.selemail} onChange={this.handleInputChange}/> <br/><br/>
                <Button bsStyle="primary" id="btnSave" onClick={this.handleSave}>Save</Button>
                </Well>
                </Panel>
                </div> 

        );
    
    }
}
