import React from "react"; 

import fire from '../fire.js';

import Player from './player.js';


var dbRefPlayers = fire.database().ref().child('player');


 
export default class Players  extends React.Component {

     

    constructor(props) {
        super(props);  
        
        //get competition and player names from URL.
        this.state ={playerName: this.props.match.params.playerName,compName: this.props.match.params.compName };

    }

    
    componentWillMount() {


         
         var dbRefPlayer= dbRefPlayers.orderByChild('surname').equalTo(this.state.playerName);
         dbRefPlayer.once('value').then(snap =>{
                  snap.forEach((child) => {
                  this.setState({forename: child.val().forename, surname: child.val().surname, email: child.val().email, phone:child.val().mobile, handicap:child.val().c_hcap});
                  //console.log(child.val())
         }) 
  
        })
    }
    

	render () {    

         return (             
            <div>  
                <h3>Competition {this.state.compName}</h3>
                <Player forename = {this.state.forename} surname = {this.state.surname} handicap = {this.state.handicap} email = {this.state.email} phone = {this.state.phone}/>    
            </div>
        )
    }	
    
}

	


