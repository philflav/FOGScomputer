import React, { Component } from 'react';
import {Table} from 'react-bootstrap'
//import PropTypes from 'prop-types';





export class Scorecard extends Component {

     

    componentWillMount() {



    }


    componentDidMount() {
        
       
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
        
        return (
            <div>
                <h5>Scorecard for {this.props.courseName}. Handicap {this.props.handicap} </h5>
                <div>
                <Table responsive cols="6">
                <thead>
                <tr>
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
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>

                </tr>
                <tr>
                    <td>SI</td> 
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>

                </tr>
                <tr>
                    <td></td>
                    <td>{this.props.scores[1]}</td>
                    <td>{this.props.scores[2]}</td>
                    <td>{this.props.scores[3]}</td>
                    <td>{this.props.scores[4]}</td>
                    <td>{this.props.scores[5]}</td>
                    <td>{this.props.scores[6]}</td>
                    <td>{this.props.scores[6]}</td>
                    <td>{this.props.scores[8]}</td>
                    <td>{this.props.scores[9]}</td>
                    <td>{this.props.f9}</td>
                </tr>
                <tr>
                    <td>Pts</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
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
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>
                    <td>4</td>

                </tr>
                <tr>
                    <td>SI</td> 
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>

                </tr>
                <tr>
                    <td></td>
                    <td>{this.props.scores[10+1]}</td>
                    <td>{this.props.scores[11+1]}</td>
                    <td>{this.props.scores[12+1]}</td>
                    <td>{this.props.scores[13+1]}</td>
                    <td>{this.props.scores[14+1]}</td>
                    <td>{this.props.scores[15+1]}</td>
                    <td>{this.props.scores[16+1]}</td>
                    <td>{this.props.scores[17+1]}</td>
                    <td>{this.props.scores[18+1]}</td>
                    <td>{this.props.b9}</td>
                    <td>{this.props.total}</td>
  
                </tr>
                <tr>
                    <td>Pts</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
                </Table>
                </div>
                
            </div>
        );
    }
}

Scorecard.propTypes = {

};

export default Scorecard;