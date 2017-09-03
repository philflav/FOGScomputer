import React from "react"; 

import {Well, Button} from 'react-bootstrap'


var day
var players = []
var displayname = []
export default class PlayOrder extends React.Component {


    componentWillReceiveProps(nextProps) {
        this.group1=''
        this.group2=''
        this.group3=''
        players=nextProps.players
        for(var j=0;j<players.length;j++){
        displayname[j]=players[j].draw ? players[j].playername : ' ##### ' 
        }
         day=nextProps.day
                if(players.length===12){ //do this when we have 12 players
            switch(day){
            case '1':
            this.group1= displayname[4]+', '+displayname[2]+', '+displayname[11]+', '+displayname[3]
            this.group2= displayname[1]+', '+displayname[0]+', '+displayname[6]+', '+displayname[7]
            this.group3= displayname[8]+', '+displayname[9]+', '+displayname[5]+', '+displayname[10]
            break
            case '2':
            this.group1= displayname[9]+', '+displayname[1]+', '+displayname[10]+', '+displayname[3]
            this.group2= displayname[4]+', '+displayname[0]+', '+displayname[8]+', '+displayname[7]
            this.group3= displayname[6]+', '+displayname[2]+', '+displayname[5]+', '+displayname[11]
            break
            case '3':
            this.group1= displayname[7]+', '+displayname[1]+', '+displayname[2]+', '+displayname[3]
            this.group2= displayname[10]+', '+displayname[8]+', '+displayname[4]+', '+displayname[6]
            this.group3= displayname[5]+', '+displayname[11]+', '+displayname[0]+', '+displayname[9]
            break
            case '4':
            this.group1= displayname[11]+', '+displayname[9]+', '+displayname[0]+', '+displayname[4]
            this.group2= displayname[7]+', '+displayname[3]+', '+displayname[8]+', '+displayname[6]
            this.group3= displayname[2]+', '+displayname[1]+', '+displayname[5]+', '+displayname[10]
            break
            default:
            
            }
        }
        if(players.length===11){ //do this when we have 11 players
            switch(day){
            case '1':
            this.group1= displayname[4]+', '+displayname[2]+', '+displayname[3]
            this.group2= displayname[1]+', '+displayname[0]+', '+displayname[6]+', '+displayname[7]
            this.group3= displayname[8]+', '+displayname[9]+', '+displayname[5]+', '+displayname[10]
            break
            case '2':
            this.group1= displayname[6]+', '+displayname[2]+', '+displayname[5]
            this.group2= displayname[9]+', '+displayname[1]+', '+displayname[10]+', '+displayname[3]
            this.group3= displayname[4]+', '+displayname[0]+', '+displayname[8]+', '+displayname[7]
            break
            case '3':
            this.group1= displayname[5]+',  '+displayname[0]+', '+displayname[9]
            this.group2= displayname[7]+', '+displayname[1]+', '+displayname[2]+', '+displayname[3]
            this.group3= displayname[10]+', '+displayname[8]+', '+displayname[4]+', '+displayname[6]
            break
            case '4':
            this.group1= displayname[9]+', '+displayname[0]+', '+displayname[4]
            this.group2= displayname[7]+', '+displayname[3]+', '+displayname[8]+', '+displayname[6]
            this.group3= displayname[2]+', '+displayname[1]+', '+displayname[5]+', '+displayname[10]
            break
            default:
            
            }
        }
        if(players.length===10){ //do this when we have 10 players
            switch(day){
                case '1':
                this.group1= displayname[1]+ ' ,' +displayname[2]+', '+displayname[0]
                this.group2= displayname[4]+', '+displayname[5]+', '+displayname[6]
                this.group3= displayname[7]+', '+displayname[8]+', '+displayname[9]+','+displayname[3]
                break
                case '2':
                this.group1= displayname[4]+', '+displayname[2]+', '+displayname[9]
                this.group2= displayname[1]+', '+displayname[8]+', '+displayname[6]
                this.group3= displayname[7]+', '+displayname[5]+', '+displayname[3]+','+displayname[0]
                break
                case '3':
                this.group1= displayname[3]+',  '+displayname[6]+', '+displayname[0]
                this.group2= displayname[2]+', '+displayname[5]+', '+displayname[8]
                this.group3= displayname[1]+', '+displayname[4]+', '+displayname[7]+','+displayname[9]
                break
                case '4':
                this.group1= displayname[1]+', '+displayname[5]+', '+displayname[9]
                this.group2= displayname[2]+', '+displayname[6]+', '+displayname[7]
                this.group3= displayname[3]+', '+displayname[4]+', '+displayname[8]+','+displayname[0]
                break
                default:
            
            }
        }
        if(players.length===9){ //do this when we have 9 players
            switch(day){
            case '1':
            this.group1= displayname[1]+ ' ,' +displayname[2]+', '+displayname[3]
            this.group2= displayname[4]+', '+displayname[5]+', '+displayname[6]
            this.group3= displayname[7]+', '+displayname[8]+', '+displayname[0]
            break
            case '2':
            this.group1= displayname[4]+', '+displayname[2]+', '+displayname[0]
            this.group2= displayname[1]+', '+displayname[8]+', '+displayname[6]
            this.group3= displayname[7]+', '+displayname[5]+', '+displayname[3]
            break
            case '3':
            this.group1= displayname[3]+',  '+displayname[6]+', '+displayname[0]
            this.group2= displayname[2]+', '+displayname[5]+', '+displayname[8]
            this.group3= displayname[1]+', '+displayname[4]+', '+displayname[7]
            break
            case '4':
            this.group1= displayname[1]+', '+displayname[5]+', '+displayname[0]
            this.group2= displayname[2]+', '+displayname[6]+', '+displayname[7]
            this.group3= displayname[3]+', '+displayname[4]+', '+displayname[8]
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
                <h3>Day {this.props.day} groups</h3>
                <Well>{this.group1}</Well>
                <Well>{this.group2}</Well>
                <Well>{this.group3}</Well>  
                <Button bsStyle='primary' href={link}> Go to day {this.props.day} results</Button>           
            </div>
        )
    }


}