import React from "react"; 

import {Panel, Well, Glyphicon} from 'react-bootstrap'

var holesPlayer
var runningTotal
var playerName


export default class PlayerProgress extends React.Component {

    constructor(props){
        super(props)
        holesPlayer=this.props.holes
        runningTotal=this.props.total
        playerName=this.props.name
    }

    componentWillReceiveProps(nextProps){

        holesPlayer=nextProps.holes
        runningTotal = nextProps.total
        playerName = nextProps.name
    }

render () {

   var rightStyle = {
        textAlign: 'right',
        paddingLeft: '12px',
        paddingRight: '10px'
    }
    var leftStyle = {
        textAlign: 'left',
        paddingLeft: '12px',
        paddingRight: '10px'
    }

     return (        
      
         <tr>
         <td style={rightStyle}>{playerName}</td><td style={leftStyle}><Glyphicon glyph="flag" />{holesPlayer}</td><td style={leftStyle}> <Glyphicon glyph="arrow-right" />{runningTotal} pts</td>
         </tr>
        
    )
}

    
    }