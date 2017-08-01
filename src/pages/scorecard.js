import React, { Component } from 'react';
import {Table, Panel} from 'react-bootstrap'
//import PropTypes from 'prop-types';

import fire from '../fire.js';

import stableford from '../stableford.js'

var dbRefHoles = fire.database().ref().child('hole');


var par=[]
var SI=[]
var pts=[]

var f9pts
var b9pts
var totalpts




export class Scorecard extends Component {

 
     

    componentWillMount() {

         



    }


    componentDidMount() {

            dbRefHoles.once('value').then(snap => {
             snap.forEach((child =>{
                   if(this.props.courseId===child.val().Course_ID){
                    var holeNum= child.val().Number
                        par[holeNum]=child.val().PAR
                        SI[holeNum]=child.val().SI
                        pts[holeNum] = stableford(this.props.handicap, this.props.scores[holeNum], par[holeNum], SI[holeNum])                  
                }   
            })
            )
            totalpts=pts.reduce((x,y) => x+y )
            b9pts=pts.slice(10).reduce((x,y) => x+y )
            f9pts=totalpts-b9pts
            
            this.forceUpdate()
            }
        
            )

       
        
       
    }

    componentWillReceiveProps(nextProps) {
   


    

    }

    shouldComponentUpdate(nextProps, nextState) {
        

        return true

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        console.log(this.props.scores)

        const scorestyle = (val) => {
            if(val===0){return {background: "grey", color: "black"}}
            if(val===1){return {background:"black",color: "white"}}
            if(val===2){return {background: "blue", color: "white"}}
            if(val>2){return {background: "green", color:"white"}}
        }

 
        
        return (
          
            <div>
                <Panel header = {this.props.courseName} bsStyle="primary">  
                <h4><i>Playing handicap {this.props.handicap}</i> </h4>
                <div>
                <Table striped responsive >
                <thead >
                <tr >
                    <th>Hole</th>  
                    <th> 1</th>
                    <th> 2</th>
                    <th> 3</th>
                    <th> 4</th>
                    <th> 5</th>
                    <th> 6</th>
                    <th> 7</th>
                    <th> 8</th>
                    <th> 9</th>
                    <th>F9</th>
                    <th>   </th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Par</td>  
                    <td>{par[1]}</td>
                    <td>{par[2]}</td>
                    <td>{par[3]}</td>
                    <td>{par[4]}</td>
                    <td>{par[5]}</td>
                    <td>{par[6]}</td>
                    <td>{par[7]}</td>
                    <td>{par[8]}</td>
                    <td>{par[9]}</td>

                </tr>
                <tr>
                    <td>SI</td>  
                    <td>{SI[1]}</td>
                    <td>{SI[2]}</td>
                    <td>{SI[3]}</td>
                    <td>{SI[4]}</td>
                    <td>{SI[5]}</td>
                    <td>{SI[6]}</td>
                    <td>{SI[7]}</td>
                    <td>{SI[8]}</td>
                    <td>{SI[9]}</td>

                </tr>
                <tr>
                    <td>Strokes</td>
                    <td>{this.props.scores[1]}</td>
                    <td>{this.props.scores[2]}</td>
                    <td>{this.props.scores[3]}</td>
                    <td>{this.props.scores[4]}</td>
                    <td>{this.props.scores[5]}</td>
                    <td>{this.props.scores[6]}</td>
                    <td>{this.props.scores[7]}</td>
                    <td>{this.props.scores[8]}</td>
                    <td>{this.props.scores[9]}</td>
                    <td>{this.props.f9}</td>
                </tr>
                <tr>
                    <td>Pts</td>
                    <td style={scorestyle(pts[1])}>{pts[1]}</td>
                    <td style={scorestyle(pts[2])}>{pts[2]}</td>
                    <td style={scorestyle(pts[3])}>{pts[3]}</td>
                    <td style={scorestyle(pts[4])}>{pts[4]}</td>
                    <td style={scorestyle(pts[5])}>{pts[5]}</td>
                    <td style={scorestyle(pts[6])}>{pts[6]}</td>
                    <td style={scorestyle(pts[7])}>{pts[7]}</td>
                    <td style={scorestyle(pts[8])}>{pts[8]}</td>
                    <td style={scorestyle(pts[9])}>{pts[9]}</td>
                    <td>{f9pts}</td>
                </tr>
                </tbody>
 
                <thead>
                <tr>
                    <th>Hole</th>  
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                    <th>13</th>
                    <th>14</th>
                    <th>15</th>
                    <th>16</th>
                    <th>17</th>
                    <th>18</th>
                    <th>B9</th>
                    <th>Total</th>
                  
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Par</td>  
                    <td>{par[10]}</td>
                    <td>{par[11]}</td>
                    <td>{par[12]}</td>
                    <td>{par[13]}</td>
                    <td>{par[14]}</td>
                    <td>{par[15]}</td>
                    <td>{par[16]}</td>
                    <td>{par[17]}</td>
                    <td>{par[18]}</td>

                </tr>
                <tr>
                    <td>SI</td>  
                    <td>{SI[10]}</td>
                    <td>{SI[11]}</td>
                    <td>{SI[12]}</td>
                    <td>{SI[13]}</td>
                    <td>{SI[14]}</td>
                    <td>{SI[15]}</td>
                    <td>{SI[16]}</td>
                    <td>{SI[17]}</td>
                    <td>{SI[18]}</td>

                </tr>
                <tr>
                    <td>Strokes</td>
                    <td>{this.props.scores[10]}</td>
                    <td>{this.props.scores[11]}</td>
                    <td>{this.props.scores[12]}</td>
                    <td>{this.props.scores[13]}</td>
                    <td>{this.props.scores[14]}</td>
                    <td>{this.props.scores[15]}</td>
                    <td>{this.props.scores[16]}</td>
                    <td>{this.props.scores[17]}</td>
                    <td>{this.props.scores[18]}</td>
                    <td>{this.props.b9}</td>
                    <td>{this.props.total}</td>
  
                </tr>
                <tr>
                    <td>Pts</td>
                    <td style={scorestyle(pts[10])}>{pts[10]}</td>
                    <td style={scorestyle(pts[11])}>{pts[11]}</td>
                    <td style={scorestyle(pts[12])}>{pts[12]}</td>
                    <td style={scorestyle(pts[13])}>{pts[13]}</td>
                    <td style={scorestyle(pts[14])}>{pts[14]}</td>
                    <td style={scorestyle(pts[15])}>{pts[15]}</td>
                    <td style={scorestyle(pts[16])}>{pts[16]}</td>
                    <td style={scorestyle(pts[17])}>{pts[17]}</td>
                    <td style={scorestyle(pts[18])}>{pts[18]}</td>
                    <td>{b9pts}</td>
                    <td ><b>{totalpts}</b></td>
                </tr>
                </tbody>
                </Table>
                </div>
                </Panel>
            </div>

        );
    }
}

Scorecard.propTypes = {

};

export default Scorecard;