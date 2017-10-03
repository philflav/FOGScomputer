import React from "react"; 

import fire from '../fire.js';

import {Panel, Well, Row, Col, Button,  Glyphicon, Clearfix} from 'react-bootstrap'
import Notifications, {notify} from 'react-notify-toast';

import stableford from '../functions/stableford.js'

import getplayerDetails from '../functions/getplayerDetails.js'

import PlayerProgress from './playerprogress.js'

var dbRefCourses = fire.database().ref().child('course');
var dbRefrtscores = fire.database().ref().child('rtscores');

var playerdbRef


var courseList = []

var playerList = []
var leaderdata = []
var scorecards = []
var scorecardKeys = []
var holescoreRefHistory =[]

var holes = []
var pars = []
var SIs = []
var holeNumber =['--',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,'--']

var history = []

//sorting function
var sort_by = function(field, reverse, primer){
    
       var key = primer ? 
           function(x) {return primer(x[field])} : 
           function(x) {return x[field]};
    
       reverse = !reverse ? 1 : -1;
    
       return function (a, b) {
           return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
         } 
    }



export default class OnCourse extends React.Component {

    constructor(props){
    super(props)
    scorecards= []
    this.state= {playername: '...',
                hcap: '0',
                selectedCourseName: 'not selected',
                holeNumber: 1,
                holePar: '' ,
                holeSI: '',
                holeStrokes: '',
                holePts: '',
                hist: [],
                total: '0',
                courses: [],
                scorecards: []
    }
    //get list of courses available
    dbRefCourses.on('value' ,snap =>{
        snap.forEach((child) => {
        courseList.push(child.val().name)
        this.setState({courses: courseList})
        })
       })

       


}

componentWillMount() {

    fire.auth().onAuthStateChanged(firebaseUser =>{
        if(firebaseUser) {

            getplayerDetails(firebaseUser.uid).then((success) => {

                    this.setState({playername: success.displayName,
                    hcap: success.handicap,
                    currentComp: success.currentComp
                })
                this.handleCourseSelect(success.compCourse)
            })
            playerdbRef = fire.database().ref().child('rtscores/'+firebaseUser.uid);           
            
        }
        else 
        {           
            window.location.href = './admin/login'
            alert('You must be signed in to perform this action')
        }
    })

//TODO for multi user t- filter on currentComp

    dbRefrtscores.on('child_changed', snap =>{
        var index = scorecardKeys.indexOf(snap.key)
        if(index <0){
            scorecardKeys.push(snap.key)
        }
        index = scorecardKeys.indexOf(snap.key)
        scorecards[index]=snap.val()
        this.setState({
            scorecards: scorecards
             })
        playerList = []
        leaderdata = []

        this.state.scorecards.forEach((card, index) => {
            if(this.state.selectedCourseName===this.state.scorecards[index].courseName){
                leaderdata.push({name: this.state.scorecards[index].playerName, holes: this.state.scorecards[index].lasthole, total:this.state.scorecards[index].total })
            }

        })

        leaderdata.sort(sort_by('total', true, parseInt))


        for (var i = 0, len = leaderdata.length; i < len; i++){
               playerList.push(<PlayerProgress name={leaderdata[i].name} holes={leaderdata[i].holes}  total={leaderdata[i].total} />)
        }

        /*

        this.forceUpdate()
        */
    })  

        
}


componentDidMount() {
    //hide menu so we can navigate away and loose data
    const nav=document.getElementById('nav')

    nav.classList.add('hide')
    
}



handleIncHole(strokes, points){
    var hole= this.state.holeNumber 
    var lasthole = hole  
    if(hole <= 18){
        hole++
        var total = this.state.total + points
        var playerName = this.state.playername
        var compName=this.state.currentComp
        var now = Date.now() //time stamp - used for database tidy up. See index.js in functions.
       

        //TODO for multiuser - write status with currentComp as a ref

        playerdbRef.child('total').set(total)
        playerdbRef.child('lasthole').set(lasthole)
        playerdbRef.child('playerName').set(playerName)
        playerdbRef.child('timestamp').set(now)
        playerdbRef.child('courseName').set(this.state.selectedCourseName) //needed for course filter
        var holescoreId= playerdbRef.child('holescore').push({comp: compName, holeNumber: lasthole, points: points, strokes: strokes, timestamp: now})
        holescoreRefHistory.push(holescoreId.getKey())
        this.setState({holeNumber: hole, total: total, holePar: pars[hole], holeSI: SIs[hole]})
        if(strokes>0){notify.show(strokes+' Entered', "success", 1500)} 
        
    }
}
handleDecHole(points){
    var hole= this.state.holeNumber 
    var total = this.state.total - points
    var key=holescoreRefHistory.pop()
    playerdbRef.child('holescore/'+key).remove()
    if(hole>1)hole--
    this.setState({holeNumber: hole, total: total, holePar: pars[hole], holeSI: SIs[hole]})
    playerdbRef.child('lasthole').set(hole-1)
    playerdbRef.child('total').set(total)
    notify.show('Hole '+hole, "warning", 1500)

}

handleClearScorecard(event){
    window.location.href = './login'
}

handleClearHole(event){
        
        var last= history.pop()
        if(last){
        var n=last.search("/")
        var points=last.slice(n+1)
        this.setState({
                hist: history,
                holeStrokes: 0,
                holePts: points
            })
        this.handleDecHole(points)
        }
             
}
handleEagle(event){
    if(this.state.holeNumber<19){
        var strokes=this.state.holePar-2
        var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
        if(strokes<1){strokes=1}
        history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
        this.setState({
         holeShots:strokes,
         holePts: pts,
         hist: history
     })
     this.handleIncHole(strokes, pts)

}
}
handleBirdie(event){
   if(this.state.holeNumber<19){
    var strokes=this.state.holePar-1
    if(strokes<1){strokes=1}
    var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
    history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
    this.setState({
        holeStrokes:strokes,
        holePts: pts,
        hist: history
    })
    this.handleIncHole(strokes, pts)
}
}

handlePar(event){
   if(this.state.holeNumber<19){
    var strokes=this.state.holePar
    if(strokes<1){strokes=1}
    var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
    history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
    this.setState({
        holeStrokes:strokes,
        holePts: pts,
        hist: history     
        

    })
    this.handleIncHole(strokes, pts)
    }
}
handleBogey(event){
   if(this.state.holeNumber<19){
    var strokes=this.state.holePar+1
    if(strokes<1){strokes=1}
    var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
    history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
    this.setState({
        holesStrokes:strokes,
        holePts: pts,
        hist: history
    })
    this.handleIncHole(strokes, pts)

}
}
handleDblBogey(event){
    if(this.state.holeNumber<19){
    var strokes=this.state.holePar+2
    if(strokes<1){strokes=1}
    var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
    history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
    this.setState({
        holeStrokes:strokes,
        holePts: pts,
        hist: history
    })
    this.handleIncHole(strokes, pts)
    }
}
handleTrpBogey(event){
   if(this.state.holeNumber<19){
    var strokes =this.state.holePar+3
    if(strokes<1){strokes=1}
    var pts= stableford(this.state.hcap, strokes, this.state.holePar, this.state.holeSI)
    history.push(this.state.holeNumber+ ' > '+strokes+'/'+ pts +' ')
    this.setState({
        holeStrokes:strokes,
        holePts: pts,
        hist: history
    })
    this.handleIncHole(strokes, pts)

}
}
handleBlob(event){
   if(this.state.holeNumber<19){
    var strokes=9
    var pts= 0
    history.push(this.state.holeNumber+ ' > -/0 ')
    this.setState({
        holeStrokes:strokes,
        holePts: pts,
        hist: history
    })
    this.handleIncHole(strokes, pts)

}
}
handleCourseSelect(eventkey){
    //console.log(this.state)
    this.setState({'selectedCourseName': eventkey})
    //get hole data
    var dbRefSelectedCourse=dbRefCourses.orderByChild('name').equalTo(eventkey)
    dbRefSelectedCourse.once('value', snap =>{
        snap.forEach((child) =>{
                holes=child.val().holes
                holes.forEach(hole =>{
                    pars[hole.number]=hole.par
                    SIs[hole.number]=hole.SI
                })
            })
        this.forceUpdate()
        })
        var hole=1
        var total=0
        this.setState({holeNumber: hole, total: total, holePar: pars[hole], holeSI: SIs[hole]})

            //force history to reset
    this.handleIncHole(0, 0)
    this.handleDecHole(0)
    }



render() {
    if(!fire.auth().currentUser)return(null)
    /*menuItems = ''
    menuItems = this.state.courses.map((course) => (
       <MenuItem eventKey={course}>{course}</MenuItem>)) */

    var title=  this.state.currentComp+' >> '+this.state.selectedCourseName +" >> "+ this.state.playername + '('+ this.state.hcap+')'
    return (

        <div>
            <Notifications />
        <Panel bsStyle="primary" header = {title}>
       {/* <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleCourseSelect.bind(this)}>
                    <NavDropdown eventKey="999" title="Select Course" id="nav-dropdown">
                    {menuItems}
                    </NavDropdown>
                </Nav> */}
            <pre>Hole:{history.slice(-1).pop()} Running total: {this.state.total} </pre>
        <Well ><h4><i>Score for hole: </i><b> {holeNumber[this.state.holeNumber]} </b> <i>Par : </i> {this.state.holePar} <i>SI : </i> {this.state.holeSI}</h4> 
        <Col>
            <Row>			 
                <Button bsStyle='success'  onClick={this.handleEagle.bind(this)}>
                <Glyphicon glyph="music" />{this.state.holePar-2}
                </Button> 
           
            		 
                <Button bsStyle='success' onClick={this.handleBirdie.bind(this)}>
                <Glyphicon glyph="star" />{this.state.holePar-1}
                </Button> 
       
          		 
                <Button bsStyle='success'  bsSize='large' onClick={this.handlePar.bind(this)}>
                <Glyphicon glyph="heart" />{this.state.holePar}
                </Button> 
           
         
          		 
                <Button bsStyle='warning'  onClick={this.handleBogey.bind(this)}>
                <Glyphicon glyph="heart-empty" />{this.state.holePar+1}
                </Button> 
         		 
                <Button bsStyle='warning'  onClick={this.handleDblBogey.bind(this)}>
                <Glyphicon glyph="thumbs-down" /> {this.state.holePar+2}
                </Button> 
    		 
                <Button bsStyle='warning' onClick={this.handleTrpBogey.bind(this)}>
                <Glyphicon glyph="hand-down" />{this.state.holePar+3}
                </Button> 
                <Button bsStyle='danger' onClick={this.handleBlob.bind(this)}>
                <Glyphicon glyph="minus-sign" />No score at hole
                </Button> 
            </Row>
            </Col><Clearfix />
   

            <Row > 
                <hr />               
               
                <Button bsStyle='primary' bsSize='large' onClick={this.handleClearHole.bind(this)}>               
                <Glyphicon glyph="arrow-left" />Back</Button> 
                <Button bsStyle='primary' bsSize='large'onClick={this.handleClearScorecard.bind(this)} >
                <Glyphicon glyph="trash" />Clear Scorecard</Button>
            
            

        </Row>
    

      </Well>
        <h5>Leaderboard</h5>
        <Well> 
        <table>
            <thead>
                <th> </th><th>  </th><th>  </th>
            </thead>
            <tbody>
                {playerList}
            </tbody>
        </table>
        </Well>
        </Panel>
        </div>

    )

}
}
