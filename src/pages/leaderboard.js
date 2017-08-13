import React from "react"; 
import ReactDOM from "react-dom";

import fire from '../fire.js';

import Player from './player.js';

import Scorecard from './scorecard.js'

import Result from './result.js'

import getscorecard from '../functions/getscorecard'


var dbRefPlayers = fire.database().ref().child('player');
var dbRefComps = fire.database().ref().child('comp');
var dbRefScorecards = fire.database().ref().child('scorecard');
var dbRefCourses = fire.database().ref().child('course');

var RESULTS = [{playerId: 6, PlayerName: 'Phil Flavin', points: 29, F1: 4, par3s: 12},
               {playerId: 7, PlayerName: 'Simon Mahoney', points: 33, F1: 3, par3s: 6},
               {playerId: 8, PlayerName: 'Basil McClean', points: 35, F1: 10, par3s: 9},
               {playerId: 9, PlayerName: 'Paul Aldous', points: 29, F1: 4, par3s: 14},
               {playerId: 13, PlayerName: 'Roger Mayhew', points: 29, F1: 4, par3s: 11},
               {playerId: 21, PlayerName: 'Paul Grant', points: 29, F1: 4, par3s: 4},
               {playerId: 23, PlayerName: 'Erik Hanson', points: 29, F1: 4, par3s: 7},
               {playerId: 31, PlayerName: 'Ian Buxton', points: 29, F1: 4, par3s: 7},
               {playerId: 26, PlayerName: 'Jim Harrison', points: 29, F1: 4, par3s: 9},
               {playerId: 30, PlayerName: 'Steve Livermore', points: 29, F1: 4, par3s: 10},
               {playerId: 10, PlayerName: 'Steve Boswell', points: 29, F1: 4, par3s: 1},
               {playerId: 28, PlayerName: 'Tony Dann', points: 29, F1: 4, par3s: 13}]

var stateCopy
var that

export default class Leaderboard extends React.Component {



    constructor(props) {
        super(props);
        

        //get competition and player names from URL.
        this.state = { compName: this.props.match.params.compName,
               results: RESULTS};
        stateCopy = Object.assign({}, this.state);
        console.log("State Copy before: ",stateCopy) 
        that=this 

    }



    componentWillMount() {
        
        //console.log('Here: ',this.state.compName) 
   
        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        var cards = [];
        var RESULTS= []
        
        
    
                dbRefComp.once('value').then(snap => {
            
                    snap.forEach((child) => {
                    //console.log("Scorecard numbers",child.val())      
                    cards.push(child.val().SC1)
                    cards.push(child.val().SC2)
                    cards.push(child.val().SC3)
                    cards.push(child.val().SC4)

            })
                  
                   
                   for (var i = 0; i < 12; i++) {               
                    getscorecard(cards[i*4]).then(function(results) {
                        RESULTS.push(results) 
                        stateCopy = {results: RESULTS} 
                        console.log("stateCopy: ",stateCopy) 
                        that.setState(stateCopy);
                        that.setState({compName: 'First results are in!' })                                                                 
                                                         
                         })
              
                    }

                   
                   
                        
                    
              
            
                 
        })
   
            //display sorted leaderboard for each player

        
                /*
           console.log('DAY2')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][1]).then(function(value) {
                    console.log(value)
                     {<Result />}
                 })
            }

            console.log('DAY3')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][2]).then(function(value) {
                    console.log(value)
                     {<Result />} 
                 })
            }
            console.log('DAY4')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][3]).then(function(value) {
                    console.log(value)
                     {<Result />}
                 })
            } */
                
        }
       
    

	render() {
        return (
      <div> 
        <h1> Leaderboard {this.state.compName} </h1>
        <table>

          <tbody>
        <tr>
          <td>
        <DayTable results={this.state.results} />
          </td>
          <td>
        <OverallTable results={this.state.results} />
          </td>
         </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
        
class ResultRow extends React.Component {

    constructor (props){
        super(props)
    }
  render() {
      //console.log('ResultRow :',this.props.results)    
    return (
      <tr>        
        <td>{this.props.results.playerId}</td>
        <td>{this.props.results.PlayerName}</td>
        <td>{this.props.results.points}</td>
        <td>{this.props.results.F1}</td>
        <td>{this.props.results.par3s}</td>
      </tr>
    );
  }
}

class DayTable extends React.Component {
    
    constructor (props){
        super(props)
    
    }
  render() {
    //console.log('DayTable :')  
    var results = this.props.results 
    //console.log("results",results)
  // var rows = [];   
    var rowItems = results.map((result) => (
    <ResultRow results={result} key={result.playerId} />))
  // results.forEach(function(rowresult) { 
      //console.log("row:", rowresult)     
    //  rows.push(<ResultRow results={rowresult} key={rowresult.playerId} />);      
    //});
    return (
      <div>
        <h3>Day result</h3>
      <table>
            <thead>
            <tr>
            <th> Name </th>
            <th> Points </th>
            <th> F1 </th>
            <th> Par3s</th>
            </tr>
          </thead>
        <tbody>{rowItems}</tbody>
      </table>
      </div>
    );
  }
}

class OverallTable extends React.Component {
    
    constructor (props){
        super(props)
    }

  render() {
    //console.log('OverallTable :')  
   var rows = []; 
   this.props.results.forEach(function(result) {      
      rows.push(<ResultRow results={result} key={result.PlayerName} />);      
    });
    return (
      <div>
        <h3>Overall Standings </h3>
      <table>
            <thead>
            <tr>
            <th> Name </th>
            <th> Points </th>
            <th> F1 </th>
            <th> Par3s</th>
            </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
       </div>
    );
  }
}

