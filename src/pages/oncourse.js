import React from "react"; 

import fire from '../fire.js';

import {Panel, Well, Row, Col, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap'

var progressBars = ['<h1>hello</h1>', '<h2>world</h2>']

var holeNumber //the current holenumber
var holePar = 4
var holeSI =13
var holeShots = 0
var holePts = 0

export default class OnCourse extends React.Component {

    constructor(props){
    super(props)

    this.state= {
        holeNumber: 1,
        holePar: 4,
        holeSI: 13,
        holeShots: 4,
        holePts: 2
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
     this.setState({
         holeShots:shots
     })
}
handleBirdie(event){
    var shots=this.state.holePar-1
    if(shots<1){shots=1}
    this.setState({
        holeShots:shots
    })
}

handlePar(event){
    var shots=this.state.holePar
    if(shots<1){shots=1}
    this.setState({
        holeShots:shots
    })

}
handleBogey(event){
    var shots=this.state.holePar+1
    if(shots<1){shots=1}
    this.setState({
        holeShots:shots
    })

}
handleDblBogey(event){
    var shots=this.state.holePar+2
    if(shots<1){shots=1}
    this.setState({
        holeShots:shots
    })

}
handleBlob(event){
    var shots=9
    this.setState({
        holeShots:shots
    })

}


render() {
    console.log(this.state)
    return (

        <div>

        <Panel bsStyle="primary" header = 'On course Scoring'>
        <Well>Course and player details </Well>
        <Well><i>Score Entry for hole </i>     <b> {this.state.holeNumber} </b><br /> 
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
                 <Col xs={4} md={2}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleEagle.bind(this)}>
                <Glyphicon glyph="flash" /> Eagle
                </Button> 
            </Col>
            <Col xs={4} md={2}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleBirdie.bind(this)}>
                <Glyphicon glyph="star" /> Birdie
                </Button> 
            </Col>
            <Col xs={4} md={2}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handlePar.bind(this)}>
                <Glyphicon glyph="ok-sign" /> Par
                </Button> 
            </Col>
            <Col xs={4} md={2}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleBogey.bind(this)}>
                <Glyphicon glyph="thumbs-down" /> Bogey
                </Button> 
            </Col>
            <Col xs={4} md={2}>			 
                <Button bsStyle='primary' bsSize='small' onClick={this.handleDblBogey.bind(this)}>
                <Glyphicon glyph="hand-down" /> Dbl Bogey
                </Button> 
            </Col>
            <Col xs={4} md={2}>			 
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
