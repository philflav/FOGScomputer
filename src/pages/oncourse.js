import React from "react"; 

import fire from '../fire.js';

import {Panel, Well, Row, Col, Button, ButtonToolbar, Glyphicon, Clearfix} from 'react-bootstrap'

import stableford from '../stableford.js'

import getplayerDetails from '../functions/getplayerDetails.js'

import PlayerProgress from './playerprogress.js'

var progressBars = ['<h1>hello</h1>', '<h2>world</h2>']
var hcap=11


var chartData = []
var chartOptions =''

var history = []


export default class OnCourse extends React.Component {

    constructor(props){
    super(props)
    this.state= {playername: '',
                hcap: '',
                courseName: 'Bell Dunes',
                holeNumber: 1,
                holePar: 3,
                holeSI: 10,
                holeShots: 4,
                holePts: 2,
                hist: ''
    }
    //getplayerDetails(auth.uid).then((success) => {
    //    this.state.playername=success.forename})


}

componentWillMount() {

    fire.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser) {
            getplayerDetails(firebaseUser.uid).then((success) => {
                    this.setState({playername: success.forename +' ' + success.surname,
                    hcap: success.c_hcap,
                    playerId: success.player_id
                })
            })            
        }
        else {
            alert('You must be signed in to perform this action')
        }
    })
}


handleIncHole(event){
    var hole= this.state.holeNumber 
    if(hole<18){hole++}else{hole=18}
    this.setState({holeNumber: hole})
}
handleDecHole(event){
    var hole= this.state.holeNumber 
    if(hole>1){hole--}else{hole=1}
    this.setState({holeNumber: hole})

}
handleClearHole(event){
        history.pop();
        this.setState({
                hist: history,
                holeShots: 0,
                holePts: 0
            })
        this.handleDecHole()
             
}
handleEagle(event){
    if(this.state.holeNumber<19){
        var shots=this.state.holePar-2
        var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
        if(shots<1){shots=1}
        history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
        this.setState({
            holeShots:shots,
         holePts: pts,
         hist: history
     })
     this.handleIncHole()

}
}
handleBirdie(event){
   if(this.state.holeNumber<19){
    var shots=this.state.holePar-1
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history
    })
    this.handleIncHole()
}
}

handlePar(event){
   if(this.state.holeNumber<19){
    var shots=this.state.holePar
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history     
        

    })
    this.handleIncHole()
    }
}
handleBogey(event){
   if(this.state.holeNumber<19){
    var shots=this.state.holePar+1
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history
    })
    this.handleIncHole()

}
}
handleDblBogey(event){
    if(this.state.holeNumber<19){
    var shots=this.state.holePar+2
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history
    })
    this.handleIncHole()
    }
}
handleTrpBogey(event){
   if(this.state.holeNumber<19){
    var shots=this.state.holePar+3
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ ']'+shots+'/'+ pts +' ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history
    })
    this.handleIncHole()

}
}
handleBlob(event){
   if(this.state.holeNumber<19){
    var shots=9
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    history.push('['+this.state.holeNumber+ '] -/0 ')
    this.setState({
        holeShots:shots,
        holePts: pts,
        hist: history
    })
    this.handleIncHole()

}
}


render() {
    console.log(this.state)
    var rowStyle ={
        paddingBottom: '10px'
    }
    var title=  this.state.courseName +". Player: "+ this.state.playername + '   ('+ this.state.hcap+')'
    return (

        <div>

        <Panel bsStyle="primary" header = {title}>
            <h4>Real-time scorecard:<pre> Last >> {history}</pre></h4>
        <Well ><h4><i>Score Entry for hole: </i><b> {this.state.holeNumber} </b> <i>Par : </i> {this.state.holePar} </h4> 
        <Col>
            <Row>			 
                <Button bsStyle='success'  onClick={this.handleEagle.bind(this)}>
                <Glyphicon glyph="flash" />{this.state.holePar-2}
                </Button> 
           
            		 
                <Button bsStyle='success' onClick={this.handleBirdie.bind(this)}>
                <Glyphicon glyph="star" />{this.state.holePar-1}
                </Button> 
       
          		 
                <Button bsStyle='success'  bsSize='large' onClick={this.handlePar.bind(this)}>
                <Glyphicon glyph="ok-sign" />{this.state.holePar}
                </Button> 
           
         
          		 
                <Button bsStyle='warning'  onClick={this.handleBogey.bind(this)}>
                <Glyphicon glyph="thumbs-down" />{this.state.holePar+1}
                </Button> 
         		 
                <Button bsStyle='warning'  onClick={this.handleDblBogey.bind(this)}>
                <Glyphicon glyph="hand-down" /> {this.state.holePar+2}
                </Button> 
    		 
                <Button bsStyle='warning' onClick={this.handleTrpBogey.bind(this)}>
                <Glyphicon glyph="fire" />{this.state.holePar+3}
                </Button> 
            </Row>
            </Col><Clearfix />
            <Row>
            <br />

            <Col xs={6}>			 
                <Button bsStyle='danger' block onClick={this.handleBlob.bind(this)}>
                <Glyphicon glyph="minus-sign" />Blob
                </Button> 
            </Col>
            </Row>
    

            <Row > 
                <hr />
                <Col xs={4} >	
                <Button bsStyle='primary' bsSize='large' onClick={this.handleClearHole.bind(this)}>
                <Glyphicon glyph="arrow-left" />Go back (Clear)
                </Button> 
            </Col>      
            

        </Row>
    

      </Well>
        <Well> 
        <table>
            <thead>
                <th> </th><th>  </th><th>  </th>
            </thead>
            <tbody>
        <PlayerProgress name = '1 Phil' holes={this.state.holeNumber-2}  total={5} />
        <PlayerProgress name = '2 Phil' holes={this.state.holeNumber-2}  total={13} />
        <PlayerProgress name = '3 Phil' holes={this.state.holeNumber-1}  total={13} />
        <PlayerProgress name = '4 Roger' holes={this.state.holeNumber-1}  total={45} />
        <PlayerProgress name = '5 Phil' holes={this.state.holeNumber-1}  total={13} />
        <PlayerProgress name = '6 Bas' holes={this.state.holeNumber-1}  total={13} />
        <PlayerProgress name = '7 Paul' holes={this.state.holeNumber-2}  total={14} />
        <PlayerProgress name = '8 Phil' holes={this.state.holeNumber-2}  total={13} />
        <PlayerProgress name = '9 Phil' holes={this.state.holeNumber-1}  total={13} />
        <PlayerProgress name = '10SImon' holes={this.state.holeNumber-1}  total={45} />
        <PlayerProgress name = '11Phil' holes={this.state.holeNumber-1}  total={13} />
        <PlayerProgress name = '12Steve' holes={this.state.holeNumber-1}  total={13} />
            </tbody>
        </table>
        </Well>
        </Panel>
        </div>

    )

}
}
