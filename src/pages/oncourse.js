import React from "react"; 

import fire from '../fire.js';

import {Panel, Well, Row, Col, Button, ButtonToolbar, Glyphicon} from 'react-bootstrap'

import stableford from '../stableford.js'

import PlayerProgress from './playerprogress.js'

var progressBars = ['<h1>hello</h1>', '<h2>world</h2>']
var hcap=11


var chartData = []
var chartOptions =''


export default class OnCourse extends React.Component {

    constructor(props){
    super(props)
    this.state= {playername: 'Phil',
                hcap: '20',
                courseName: 'Bell Dunes',
                holeNumber: 1,
                holePar: 3,
                holeSI: 10,
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
         lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts +' pts'
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
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts +' pts'
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
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts +' pts'     
        

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
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts+' pts'
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
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts+' pts'
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
        lastEntry: 'Hole: '+this.state.holeNumber+ ' > '+shots+' for '+ pts +' pts'
    })
    this.handleIncHole()

}
handleBlob(event){
    var shots=9
    var pts= stableford(this.state.hcap, shots, this.state.holePar, this.state.holeSI)
    this.setState({
        holeShots:shots,
        holePts: pts,
        lastEntry: 'for hole: '+this.state.holeNumber+ ' > '+ 'was blobbed'
    })
    this.handleIncHole()

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
            <h4>Real-time scorecard:<pre> Last >> {this.state.lastEntry}</pre></h4>
        <Well ><h4><i>Score Entry for hole: </i><b> {this.state.holeNumber} </b> <i>Par : </i> {this.state.holePar} </h4> 
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
            <Row>
            <br />

            <Col>			 
                <Button bsStyle='danger'  block onClick={this.handleBlob.bind(this)}>
                <Glyphicon glyph="minus-sign" />Blob
                </Button> 
            </Col>
            </Row>
    

            <Row > 
                <hr />
                <Col xs={3} >	
                <Button bsStyle='primary' bsSize='large' onClick={this.handleDecHole.bind(this)}>
                <Glyphicon glyph="arrow-left" />Back
                </Button> 
            </Col> <Col xs={3}>	
                <Button bsStyle='primary' bsSize='large' onClick={this.handleIncHole.bind(this)}>
                <Glyphicon glyph="arrow-right" />Next
                </Button> 
            </Col>  <Col xs={3}>	
                <Button bsStyle='primary' bsSize='large' onClick={this.handleClearHole.bind(this)}>
                <Glyphicon glyph="remove" /> Clear
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
