import React from "react"; 

import fire from '../fire.js';

import Player from './player.js';

import Scorecard from './scorecard.js'


var dbRefPlayers = fire.database().ref().child('player');
var dbRefComps = fire.database().ref().child('comp');
var dbRefScorecards = fire.database().ref().child('scorecard');
var dbRefCourses = fire.database().ref().child('course');

var day1score=[];
var day1f9total;
var day1b9score=[];
var day1b9total;
var day1total;
var day1hcap;

var day2score=[];
var day2f9total;
var day2b9score=[];
var day2b9total;
var day2total;
var day2hcap;

var day3score=[];
var day3f9total;
var day3b9score=[];
var day3b9total;
var day3total;
var day3hcap;

var day4score=[];
var day4f9total;
var day4b9score=[];
var day4b9total;
var day4total;
var day4hcap;
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
         })
    
    
        
                   
                    

        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        
        var dbRefScorecard = dbRefScorecards.orderByChild('scorecard_id');
       
                dbRefComp.once('value').then(snap =>{ 
                        //console.log("--", snap.val())              
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
                    //console.log("0", this.state)   
                    })   
                
                   //Lookup course ID for courses played     
                dbRefScorecard.once('value').then(snap => {

                snap.forEach((child) =>{
                    if((this.state.index1)===child.val().scorecard_id){
                        this.setState({courseId1: child.val().course_id}) 
                        day1score[1] =  child.val().S1
                        day1score[2] =  child.val().S2 
                        day1score[3] =  child.val().S3 
                        day1score[4] =  child.val().S4 
                        day1score[5] =  child.val().S5 
                        day1score[6] =  child.val().S6 
                        day1score[7] =  child.val().S7 
                        day1score[8] =  child.val().S8 
                        day1score[9] =  child.val().S9 
                        day1f9total =day1score.reduce((x, y) => x + y); 
                        day1b9score[1] =  child.val().S10
                        day1b9score[2] =  child.val().S11 
                        day1b9score[3] =  child.val().S12 
                        day1b9score[4] =  child.val().S13 
                        day1b9score[5] =  child.val().S14 
                        day1b9score[6] =  child.val().S15 
                        day1b9score[7] =  child.val().S16 
                        day1b9score[8] =  child.val().S17 
                        day1b9score[9] =  child.val().S18 
                        day1b9total = day1b9score.reduce((x, y) => x + y);
                        day1total = day1f9total+day1b9total 
                        day1hcap =  child.val().hcap
                        day1score=day1score.concat(day1b9score.slice(1))
                                       
                    }
                    if((this.state.index2)===child.val().scorecard_id){
                        this.setState({courseId2: child.val().course_id})
                        day2score[1] =  child.val().S1
                        day2score[2] =  child.val().S2 
                        day2score[3] =  child.val().S3 
                        day2score[4] =  child.val().S4 
                        day2score[5] =  child.val().S5 
                        day2score[6] =  child.val().S6 
                        day2score[7] =  child.val().S7 
                        day2score[8] =  child.val().S8 
                        day2score[9] =  child.val().S9 
                        day2f9total =day2score.reduce((x, y) => x + y); 
                        day2b9score[1] =  child.val().S10
                        day2b9score[2] =  child.val().S11 
                        day2b9score[3] =  child.val().S12 
                        day2b9score[4] =  child.val().S13 
                        day2b9score[5] =  child.val().S14 
                        day2b9score[6] =  child.val().S15 
                        day2b9score[7] =  child.val().S16 
                        day2b9score[8] =  child.val().S17 
                        day2b9score[9] =  child.val().S18 
                        day2b9total = day2b9score.reduce((x, y) => x + y);
                        day2total = day2f9total+day2b9total 
                        day2hcap =  child.val().hcap  
                        day2score=day2score.concat(day2b9score.slice(1))                    
                    }
                    if((this.state.index3)===child.val().scorecard_id){
                        this.setState({courseId3: child.val().course_id})
                        day3score[1] =  child.val().S1
                        day3score[2] =  child.val().S2 
                        day3score[3] =  child.val().S3 
                        day3score[4] =  child.val().S4 
                        day3score[5] =  child.val().S5 
                        day3score[6] =  child.val().S6 
                        day3score[7] =  child.val().S7 
                        day3score[8] =  child.val().S8 
                        day3score[9] =  child.val().S9 
                        day3f9total =day3score.reduce((x, y) => x + y); 
                        day3b9score[1] =  child.val().S10
                        day3b9score[2] =  child.val().S11 
                        day3b9score[3] =  child.val().S12 
                        day3b9score[4] =  child.val().S13 
                        day3b9score[5] =  child.val().S14 
                        day3b9score[6] =  child.val().S15 
                        day3b9score[7] =  child.val().S16 
                        day3b9score[8] =  child.val().S17 
                        day3b9score[9] =  child.val().S18 
                        day3b9total = day3b9score.reduce((x, y) => x + y);
                        day3total = day3f9total+day3b9total 
                        day3hcap =  child.val().hcap  
                        day3score=day3score.concat(day3b9score.slice(1))                        
                    }
                    if((this.state.index4)===child.val().scorecard_id){
                        this.setState({courseId4: child.val().course_id}) 
                        day4score[1] =  child.val().S1
                        day4score[2] =  child.val().S2 
                        day4score[3] =  child.val().S3 
                        day4score[4] =  child.val().S4 
                        day4score[5] =  child.val().S5 
                        day4score[6] =  child.val().S6 
                        day4score[7] =  child.val().S7 
                        day4score[8] =  child.val().S8 
                        day4score[9] =  child.val().S9 
                        day4f9total =day4score.reduce((x, y) => x + y); 
                        day4b9score[1] =  child.val().S10
                        day4b9score[2] =  child.val().S11 
                        day4b9score[3] =  child.val().S12 
                        day4b9score[4] =  child.val().S13 
                        day4b9score[5] =  child.val().S14 
                        day4b9score[6] =  child.val().S15 
                        day4b9score[7] =  child.val().S16 
                        day4b9score[8] =  child.val().S17 
                        day4b9score[9] =  child.val().S18 
                        day4b9total = day4b9score.reduce((x, y) => x + y);
                        day4total = day4f9total+day4b9total 
                        day4hcap =  child.val().hcap  
                        day4score=day4score.concat(day4b9score.slice(1))                    
                    }
                    
                     //console.log("1",this.state)
                     
                    })
                })
               

                //Look up course names

                dbRefCourses.once('value').then(snap =>{
                    snap.forEach((child) => {
                        //console.log(child.val())
                        if((this.state.courseId1)===child.val().Course_id){
                            this.setState({courseName1: child.val().CourseName})                       
                        }
                        if((this.state.courseId2)===child.val().Course_id){
                            this.setState({courseName2: child.val().CourseName})                       
                        }
                        if((this.state.courseId3)===child.val().Course_id){
                            this.setState({courseName3: child.val().CourseName})                       
                        }
                        if((this.state.courseId4)===child.val().Course_id){
                            this.setState({courseName4: child.val().CourseName})                       
                        }
                        })
                      //  console.log("2",this.state)
                })
                
         }       
              
                
            
        
        

	render () {    

         return (             
            <div>  
                <h3>Competition {this.state.compName}</h3>
                <Player forename = {this.state.forename} surname = {this.state.surname} handicap = {this.state.handicap} email = {this.state.email} phone = {this.state.phone}/>          
                       
                        <div>
                        <Scorecard courseName = {this.state.courseName1} courseId = {this.state.courseId1}  handicap={day1hcap} scores= {day1score} f9={day1f9total} b9={day1b9total} total={day1total}/> ;
                        <Scorecard courseName = {this.state.courseName2} courseId = {this.state.courseId2}  handicap={day2hcap} scores= {day2score} f9={day2f9total} b9={day2b9total} total={day2total}/>;
                        <Scorecard courseName = {this.state.courseName3} courseId = {this.state.courseId3}  handicap={day3hcap} scores= {day3score} f9={day3f9total} b9={day3b9total} total={day3total}/> ;
                        <Scorecard courseName = {this.state.courseName4} courseId = {this.state.courseId4}  handicap={day4hcap} scores= {day4score} f9={day4f9total} b9={day4b9total} total={day4total}/> ;
                        </div>
                      
            </div>
        )
    }	
    
}

	


