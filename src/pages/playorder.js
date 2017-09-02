import React from "react"; 

import {Well, Button} from 'react-bootstrap'


var day
var players = []

export default class PlayOrder extends React.Component {


    componentWillReceiveProps(nextProps) {
        this.group1=''
        this.group2=''
        this.group3=''
        players=nextProps.players
         day=nextProps.day
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
            this.group1= players[11].playername+', '+players[9].playername+', '+players[0].playername+', '+players[4].playername
            this.group2= players[7].playername+', '+players[3].playername+', '+players[8].playername+', '+players[6].playername
            this.group3= players[2].playername+', '+players[1].playername+', '+players[5].playername+', '+players[10].playername
            break
            default:
            
            }
        }
        if(players.length===11){ //do this when we have 11 players
            switch(day){
            case '1':
            this.group1= players[4].playername+', '+players[2].playername+', '+players[3].playername
            this.group2= players[1].playername+', '+players[0].playername+', '+players[6].playername+', '+players[7].playername
            this.group3= players[8].playername+', '+players[9].playername+', '+players[5].playername+', '+players[10].playername
            break
            case '2':
            this.group1= players[6].playername+', '+players[2].playername+', '+players[5].playername
            this.group2= players[9].playername+', '+players[1].playername+', '+players[10].playername+', '+players[3].playername
            this.group3= players[4].playername+', '+players[0].playername+', '+players[8].playername+', '+players[7].playername
            break
            case '3':
            this.group1= players[5].playername+',  '+players[0].playername+', '+players[9].playername
            this.group2= players[7].playername+', '+players[1].playername+', '+players[2].playername+', '+players[3].playername
            this.group3= players[10].playername+', '+players[8].playername+', '+players[4].playername+', '+players[6].playername
            break
            case '4':
            this.group1= players[9].playername+', '+players[0].playername+', '+players[4].playername
            this.group2= players[7].playername+', '+players[3].playername+', '+players[8].playername+', '+players[6].playername
            this.group3= players[2].playername+', '+players[1].playername+', '+players[5].playername+', '+players[10].playername
            break
            default:
            
            }
        }
        if(players.length===10){ //do this when we have 10 players
            switch(day){
            case '1':
            this.group1= players[4].playername+', '+players[2].playername+', '+players[3].playername
            this.group2= players[8].playername+', '+players[9].playername+', '+players[5].playername
            this.group3= players[1].playername+', '+players[0].playername+', '+players[6].playername+', '+players[7].playername
            break
            case '2':
            this.group1= players[6].playername+', '+players[2].playername+', '+players[5].playername
            this.group2= players[9].playername+', '+players[1].playername+', '+players[3].playername
            this.group3= players[4].playername+', '+players[0].playername+', '+players[8].playername+', '+players[7].playername
            break
            case '3':
            this.group1= players[5].playername+',  '+players[0].playername+', '+players[9].playername
            this.group2= players[8].playername+', '+players[4].playername+', '+players[6].playername
            this.group3= players[7].playername+', '+players[1].playername+', '+players[2].playername+', '+players[3].playername
            break
            case '4':
            this.group1= players[9].playername+', '+players[0].playername+', '+players[4].playername
            this.group2= players[2].playername+', '+players[1].playername+', '+players[5].playername
            this.group3= players[7].playername+', '+players[3].playername+', '+players[8].playername+', '+players[6].playername
            break
            default:
            
            }
        }
        if(players.length===9){ //do this when we have 9 players
            switch(day){
            case '1':
            this.group1= players[4].playername+', '+players[2].playername+', '+players[3].playername
            this.group2= players[8].playername+', '+players[7].playername+', '+players[5].playername
            this.group3= players[1].playername+', '+players[0].playername+', '+players[6].playername
            break
            case '2':
            this.group1= players[6].playername+', '+players[2].playername+', '+players[5].playername
            this.group2= players[7].playername+', '+players[1].playername+', '+players[3].playername
            this.group3= players[4].playername+', '+players[0].playername+', '+players[8].playername
            break
            case '3':
            this.group1= players[5].playername+',  '+players[0].playername+', '+players[3].playername
            this.group2= players[8].playername+', '+players[4].playername+', '+players[6].playername
            this.group3= players[7].playername+', '+players[1].playername+', '+players[2].playername
            break
            case '4':
            this.group1= players[0].playername+', '+players[6].playername+', '+players[4].playername
            this.group2= players[2].playername+', '+players[1].playername+', '+players[5].playername
            this.group3= players[7].playername+', '+players[3].playername+', '+players[8].playername
            break
            default:
            
            }
        }
    }
    

    componentWillMount(){
        
    }



    render () {
        var link = './'+this.props.compName+'/'+this.props.day+'/leaderboard'
        return (
            <div>
                <Button href={link}> Day {this.props.day} results</Button>
                <Well>{this.group1}</Well>
                <Well>{this.group2}</Well>
                <Well>{this.group3}</Well>             
            </div>
        )
    }


}