import React from "react"; 

import {Panel, Table, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Well, Button} from 'react-bootstrap'

var group 
var day
var players = []

export default class PlayOrder extends React.Component {

    constructor(props){
        super(props)

        group='empty'


    }

    

    componentWillReceiveProps(nextProps) {
        this.group1=''
        this.group2=''
        this.group3=''
        players=nextProps.players
        day=nextProps.day
        console.log('Players: ', players)
        if(players.length===12){ //do this when we have 12 players
            switch(day){
            case '1':
            this.group1= players[4].playername+', '+players[2].playername+', '+players[11].playername+', '+players[3].playername
            this.group2= players[1].playername+', '+players[0].playername+', '+players[6].playername+', '+players[7].playername
            this.group3= players[8].playername+', '+players[9].playername+', '+players[5].playername+', '+players[10].playername
            break
            case '2':
            this.group1= players[9].playername+', '+players[1].playername+', '+players[10].playername+', '+players[3].playername
            this.group2= players[4].playername+', '+players[0].playername+', '+players[8].playername+', '+players[7].playername
            this.group3= players[6].playername+', '+players[2].playername+', '+players[5].playername+', '+players[11].playername
            break
            case '3':
            this.group1= players[7].playername+', '+players[1].playername+', '+players[2].playername+', '+players[3].playername
            this.group2= players[10].playername+', '+players[8].playername+', '+players[4].playername+', '+players[6].playername
            this.group3= players[5].playername+', '+players[11].playername+', '+players[0].playername+', '+players[9].playername
            break
            case '4':
            this.group1= players[11].playername+', '+players[9].playername+', '+players[1].playername+', '+players[4].playername
            this.group2= players[7].playername+', '+players[3].playername+', '+players[8].playername+', '+players[6].playername
            this.group3= players[2].playername+', '+players[1].playername+', '+players[5].playername+', '+players[10].playername
            break
            default:
            this.group= 'Day not found'
            }
        }
    }
    

    componentWillMount(){
        
    }



    render () {
        console.log(day, players)
        return (
            <div>
                <h5>Day {this.props.day}</h5>
                <Well>{this.group1}</Well>
                <Well>{this.group2}</Well>
                <Well>{this.group3}</Well>             
            </div>
        )
    }


}