import React from "react"; 

import fire from '../fire.js';

import {Panel, Well, Row, Col, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap'

import stableford from '../stableford.js'

var progressBars = ['<h1>hello</h1>', '<h2>world</h2>']
var hcap=11


export default class OnCourse extends React.Component {

    constructor(props){
    super(props)
    this.state= {playername: 'Phil',
                hcap: '20',
                courseName: 'Bell Dunes',
                holeNumber: 1,
                holePar: 5,
                holeSI: 1,
                holeShots: 4,
                holePts: 2,
                lastEntry: '...'
    }

 

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
    this.setState({
        holeShots: 0,
        holePts: 0
    })
}
handleEagle(event){
     var shots=this.state.holePar-2
     if(shots<1){shots=1}
     var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
     this.setState({
         holeShots:shots,
         holePts: pts,
         lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
     })
     this.handleIncHole()

}
handleBirdie(event){
    var shots=this.state.holePar-1
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
    })
    this.handleIncHole()
}

handlePar(event){
    var shots=this.state.holePar
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts      
        

    })
    this.handleIncHole()

}
handleBogey(event){
    var shots=this.state.holePar+1
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
    })
    this.handleIncHole()

}
handleDblBogey(event){
    var shots=this.state.holePar+2
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
    })
    this.handleIncHole()

}
handleTrpBogey(event){
    var shots=this.state.holePar+3
    if(shots<1){shots=1}
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
    })
    this.handleIncHole()

}
handleBlob(event){
    var shots=9
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts
    })
    this.handleIncHole()

}


render() {
    console.log(this.state)
    var title=  this.state.courseName +". Player: "+ this.state.playername + '   ('+ this.state.hcap+')'
    return (

        <div>

        <Panel bsStyle="primary" header = {title}>
            <h4>Real-time scorecard:<pre> Last entry at {this.state.lastEntry}</pre></h4>
        <Well bsSize="small"><i>Score Entry for hole </i>     <b> {this.state.holeNumber} </b><br /> 
        <Row>
        <Col xs={12} md={10}>
			 <Row>
                 <Col md={2}>Par: {this.state.holePar}</Col>
                 <Col md={2}>SI: {this.state.holeSI}</Col>
                 <Col md={3}>Shots:{this.state.holeShots}</Col>
                 <Col md={3}>Points:{this.state.holePts}</Col>
            </Row>	

    	</Col>

            <ButtonToolbar>	 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleDecHole.bind(this)}>
                <Glyphicon glyph="arrow-up" /> 
                </Button>
                <Button bsStyle='primary' bsSize='small' onClick={this.handleIncHole.bind(this)}>
                <Glyphicon glyph="arrow-down" />
                </Button> 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleClearHole.bind(this)}>
                <Glyphicon glyph="remove" />
                </Button> 
                
            </ButtonToolbar>

        </Row>
        </Well>
        <ButtonToolbar>
                 <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleEagle.bind(this)}>
                <Glyphicon glyph="flash" /> Eagle({this.state.holePar-2})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleBirdie.bind(this)}>
                <Glyphicon glyph="star" /> Birdie({this.state.holePar-1})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handlePar.bind(this)}>
                <Glyphicon glyph="ok-sign" /> Par({this.state.holePar})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleBogey.bind(this)}>
                <Glyphicon glyph="thumbs-down" /> Bogey({this.state.holePar+1})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleDblBogey.bind(this)}>
                <Glyphicon glyph="hand-down" /> Dbl Bogey({this.state.holePar+2})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleTrpBogey.bind(this)}>
                <Glyphicon glyph="fire" /> Trpl Bogey({this.state.holePar+3})
                </Button> 
            </Col>
            <Col xs={4} md={1}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleBlob.bind(this)}>
                <Glyphicon glyph="minus-sign" /> Blob
                </Button> 
            </Col>

        </ButtonToolbar>
        
        <Well> Leaderboard Graphic 
            {progressBars}
        </Well>
        </Panel>
        </div>

    )

}
}
