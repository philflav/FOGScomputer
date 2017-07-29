import React from "react"; 

import fire from '../fire.js';

import Player from './player.js';

import Scorecard from './scorecard.js'


var dbRefPlayers = fire.database().ref().child('player');
var dbRefComps = fire.database().ref().child('comp');
var dbRefScorecards = fire.database().ref().child('scorecard');
var dbRefCourses = fire.database().ref().child('course');


 
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
                  this.setState({playerId: child.val().player_id, forename: child.val().forename, surname: child.val().surname, email: child.val().email, phone:child.val().mobile, handicap:child.val().c_hcap});
                  
         }) 
        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        var dbRefScorecard = dbRefScorecards.orderByChild('scorecard_id')
       
        dbRefComp.once('value').then(snap =>{
               
                snap.forEach((child) => {
                    if(child.val().player_id === (this.state.playerId)){
                        this.setState({
                            index1: child.val().SC1,
                            index2: child.val().SC2,
                            index3: child.val().SC3,
                            index4: child.val().SC4,
 
                                 })
                             }
              
                        })     
                    })   
                   //Lookup course ID for courses played     
                dbRefScorecard.once('value').then(snap => {
                snap.forEach((child) =>{
                    if((this.state.index1)===child.val().scorecard_id){
                        this.setState({courseId1: child.val().course_id})                       
                    }
                    if((this.state.index2)===child.val().scorecard_id){
                        this.setState({courseId2: child.val().course_id})                       
                    }
                    if((this.state.index3)===child.val().scorecard_id){
                        this.setState({courseId3: child.val().course_id})                       
                    }
                    if((this.state.index4)===child.val().scorecard_id){
                        this.setState({courseId4: child.val().course_id})                       
                    }
               
                     
                    })
                })
                console.log(this.state)

                //Look up course names

                dbRefCourses.once('value').then(snap =>{
                    snap.forEach((child) => {
                        if((this.state.courseId1)===child.val().course_id){
                            this.setState({courseName1: child.val().CourseName})                       
                        }
                        if((this.state.courseId2)===child.val().course_id){
                            this.setState({courseName2: child.val().CourseName})                       
                        }
                        if((this.state.courseId3)===child.val().course_id){
                            this.setState({courseName3: child.val().CourseName})                       
                        }
                        if((this.state.courseId4)===child.val().course_id){
                            this.setState({courseName4: child.val().CourseName})                       
                        }
                        })

                })
                
                    console.log(this.state)
              
                } 
            )}
        
        

	render () {    

         return (             
            <div>  
                <h3>Competition {this.state.compName}</h3>
                <Player forename = {this.state.forename} surname = {this.state.surname} handicap = {this.state.handicap} email = {this.state.email} phone = {this.state.phone}/>          
                       
                        <div>
                        <Scorecard index = {this.state.courseName1} /> ;
                        <Scorecard index = {this.state.courseName2} /> ;
                        <Scorecard index = {this.state.courseName3} /> ;
                        <Scorecard index = {this.state.courseName4} /> ;
                        </div>
                      
            </div>
        )
    }	
    
}

	


