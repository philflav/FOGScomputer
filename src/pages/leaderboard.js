import React from "react"; 

import fire from '../fire.js';

import {Panel, Table} from 'react-bootstrap'

import getscorecard from '../functions/getscorecard'



var dbRefComps = fire.database().ref().child('comp');



var stateCopy
var that

export default class Leaderboard extends React.Component {



    constructor(props) {
        super(props);
        

        //get competition and player names from URL.
        this.state = { compName: this.props.match.params.compName,
                day: this.props.match.params.day,
               results: [],
               overall: []}
        stateCopy = Object.assign({}, this.state);

        that=this 

    }



    componentWillMount() {
        
        //console.log('Here: ',this.state.compName) 
   
        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        var cards = [];
        var RESULTS= []
        var OVERALL= []
       
        
        
    
                    dbRefComp.once('value').then(snap => {
            
                    snap.forEach((child) => {
                    //console.log("Scorecard numbers",child.val())      
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
                          
                      
                          OVERALL.push({PlayerName: scorecard1.PlayerName, tpar3s: par3Count, tpoints: ptsCount, tF1: F1Count})
                          OVERALL.sort(function (a, b) {
                            return b.tpoints - a.tpoints;
                                }); 
                          stateCopy = {overall: OVERALL}
                          that.setState(stateCopy)  
 
                          })
                        })
                      }) 
                      
                      //console.log(that.state)
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
                   for (i = 0; i < cards.length/4; i++) {               
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
                   for (i = 0; i < cards.length/4; i++) {               
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
                   for (i = 0; i < cards.length/4; i++) {               
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
        <OverallTable results={this.state.overall} />
        </Panel>
      </div>
    );
  }
}
        
class ResultRow extends React.Component {

    render() {
      //console.log('ResultRow :',this.props.results)    
    return (
      <tr>  
        <td>{this.props.results.PlayerName}({this.props.results.handicap}) </td>
        <td>{this.props.results.points}  </td>
        <td>{this.props.results.F1}  </td>
        <td>{this.props.results.par3s}  </td>
      </tr>
    );
  }
}
class OverallResultRow extends React.Component {

    render() {
        console.log('ResultRow :',this.props.results)    
      return (
        <tr>  
          <td>{this.props.results.PlayerName} </td>
          <td>{this.props.results.tpoints}  </td>
          <td>{this.props.results.tF1}  </td>
          <td>{this.props.results.tpar3s}  </td>
        </tr>
      );
    }
  }

class DayTable extends React.Component {
    
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
            <th>  Name</th>
            <th>  Points  </th>
            <th>  F1    </th>
            <th>  Par3s </th>
            </tr>
          </thead>
        <tbody>{rowItems}</tbody>
      </Table>
      </Panel>
      </div>
    );
  }
}

class OverallTable extends React.Component {

  render() {
    //console.log('OverallTable :')  
   var rows = []; 
   var results=this.props.results
   console.log(results)
   
   results.forEach(function(overallResult) {      
      rows.push(<OverallResultRow results={overallResult} key={overallResult.PlayerName} />);  
      console.log("over: ",overallResult)    
    });
    return (
      <div>
      <Panel bsStyle="primary" header="Overall Leaderboard">
      <Table striped bordered condensed hover>
            <thead>
            <tr>
            <th> Name </th>
            <th> Points </th>
            <th> F1 </th>
            <th> Par3s</th>
            </tr>
          </thead>
        <tbody>{rows}</tbody>
      </Table>
      </Panel>
       </div>
    );
  }
}

