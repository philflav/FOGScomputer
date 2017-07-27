import React from "react"; 

import fire from '../fire.js';

import Player from './player.js';


var dbRefPlayers = fire.database().ref().child('player');


 
export default class Players  extends React.Component {

     

    constructor(props) {
        super(props);
        
        this.state={playerName:props.match.params.playerName}

     
    }

    
    componentWillMount() {
         
         var dbRefPlayer= dbRefPlayers.orderByChild('surname').equalTo(this.state.playerName);
         dbRefPlayer.once('value').then(snap =>{
                  snap.forEach((child) => {
                  this.setState({forename: child.val().forename, surname: child.val().surname, email: child.val().email, phone:child.val().mobile, handicap:child.val().c_hcap});
                  console.log(child.val())
         }) 
  
        })
    }
    

	render () {    

         return (             
            <div>  
                <Player forename = {this.state.forename} surname = {this.state.surname} handicap = {this.state.handicap} email = {this.state.email} phone = {this.state.phone}/>    
            </div>
        )
    }	
    
}

	


