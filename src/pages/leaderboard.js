import React from "react"; 
import ReactDOM from "react-dom";

import fire from '../fire.js';

import Player from './player.js';

import Scorecard from './scorecard.js'

import Result from './result.js'

import {Panel, Table} from 'react-bootstrap'

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
                day: this.props.match.params.day,
               results: RESULTS};
        stateCopy = Object.assign({}, this.state);
        //console.log("State Copy before: ",stateCopy) 
        that=this 

    }



    componentWillMount() {
        
        //console.log('Here: ',this.state.compName) 
   
        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        var cards = [];
        var RESULTS= []
       
        
        
    
                var readcards = dbRefComp.once('value').then(snap => {
            
                    snap.forEach((child) => {
                    console.log("Scorecard numbers",child.val())      
                    cards.push(child.val().SC1)
                    cards.push(child.val().SC2)
                    cards.push(child.val().SC3)
                    cards.push(child.val().SC4)
                    var day1 = new getscorecard(child.val().SC1)
                    var day2 = new getscorecard(child.val().SC2)
                    var day3 = new getscorecard(child.val().SC3)
                    var day4 = new getscorecard(child.val().SC4)
                    var allcards =[] 
                    day1.then(function(scorecard1) {
                      allcards.push(scorecard1)
                      day2.then(function(scorecard2) {
                        allcards.push(scorecard2)
                        day3.then(function(scorecard3) {
                          allcards.push(scorecard3)
                          day4.then(function(scorecard4) {
                            allcards.push(scorecard4)
                              var par3Count = allcards.reduce(function(total, obj) {
                                return total + ['par3s'].reduce(function(total, prop) {
                                    return total + obj[prop];
                                      }, 0);
                                    }, 0);
                              var ptsCount = allcards.reduce(function(total, obj) {
                                  return total + ['points'].reduce(function(total, prop) {
                                      return total + obj[prop];
                                      }, 0);
                                    }, 0);
                              var F1Count = allcards.reduce(function(total, obj) {
                                  return total + ['F1'].reduce(function(total, prop) {
                                      return total + obj[prop];
                                     }, 0);
                                   }, 0);
                          
                          console.log(scorecard1,'Par3s',par3Count, 'Points', ptsCount, 'F1',F1Count);
                            
                                                 })
                      })
                      }) 
                    }) 
                            
            })
              
                  
                switch(that.state.day){
                   case '1': //get day 1 results
                   for (var i = 0; i < cards.length/4; i++) {               
                    getscorecard(cards[i*4]).then(function(results) {
                        RESULTS.push(results)
                        RESULTS.sort(function (a, b) {
                        return b.points - a.points;
                            }); 
                        stateCopy = {results: RESULTS} 
                        that.setState(stateCopy)       
                         })
              
                    }
                    break
                    case '2': //get day 2 results
                   for (var i = 0; i < cards.length/4; i++) {               
                    getscorecard(cards[1+i*4]).then(function(results) {
                        RESULTS.push(results)
                        RESULTS.sort(function (a, b) {
                        return b.points - a.points;
                            }); 
                        stateCopy = {results: RESULTS} 
                        that.setState(stateCopy)       
                         })
              
                    }
                    break
                    case '3': //get day 3 results
                   for (var i = 0; i < cards.length/4; i++) {               
                    getscorecard(cards[2+i*4]).then(function(results) {
                         RESULTS.push(results)
                        RESULTS.sort(function (a, b) {
                        return b.points - a.points;
                            }); 
                        stateCopy = {results: RESULTS} 
                        that.setState(stateCopy)       
                         })
              
                    }
                    break  
                    case '4': //get day 4 results
                   for (var i = 0; i < cards.length/4; i++) {               
                    getscorecard(cards[3+i*4]).then(function(results) {
                        RESULTS.push(results)
                        RESULTS.sort(function (a, b) {
                        return b.points - a.points;
                            }); 
                        stateCopy = {results: RESULTS} 
                        that.setState(stateCopy)       
                         })
              
                    }
                    break                                     
                    default:
                        that.setState({day: 'undefined'})
                        that.setState({results: {courseName: 'overall'}})

                }
        
            })
                  
        }
       
    

	render() {
        return (
      <div> 
        <Panel bsStyle="primary" header = {this.state.compName}> 
        <DayTable results={this.state.results} />
        </Panel>
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
        <td>{this.props.results.playerId} </td>
        <td>{this.props.results.PlayerName}({this.props.results.handicap}) </td>
        <td>{this.props.results.points}  </td>
        <td>{this.props.results.F1}  </td>
        <td>{this.props.results.par3s}  </td>
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
    var coursename = 'undefined'
    var rowItems = results.map((result) => (
    coursename = result.CourseName,
    <ResultRow results={result} key={result.playerId} />))
    return (
      <div>
      <Panel bsStyle="info" header= {"Result for "+(coursename)}>
      <Table striped bordered condensed hover >
            <thead>
            <tr>
            <th> Player ID </th>
            <th>  Name(handicap) </th>
            <th>  Points  </th>
            <th>  F1    </th>
            <th>  Par3s </th>
            </tr>
          </thead>
        <tbody>{rowItems}</tbody>
      </Table>
      </Panel>
      <Panel bsStyle = "info" header={"Overall placings after "  + (coursename)}>
        <Table>
        <thead>
            <tr>
            <th> Player ID </th>
            <th>  Name(handicap) </th>
            <th>  Points  </th>
            <th>  F1    </th>
            <th>  Par3s </th>
            </tr>
          </thead>
        </Table>
      </Panel>
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

