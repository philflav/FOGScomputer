import React from "react"; 

import fire from '../fire.js';

import {  Panel,  Form, Button, } from 'react-bootstrap'

import DropdownInput from 'react-dropdown-input2'

import getplayerDetails from '../functions/getplayerDetails.js'


var dbRefPlayers = fire.database().ref().child('player')
var dbRefCourses = fire.database().ref().child('course')
var that
 
export default class LoginForm extends React.Component {
 
    constructor(props){
        super(props)
        this.state=({
            open: false,
            displayName: 'Display Name',
            handicap: 0,
            compCourse: '',
            currentComp: 'Alpha test',
            courses: [] //populates onComponentWillMount

        })
        that=this
    }

    componentWillMount(){
        //setup courseNames for selector box
        dbRefCourses.once('value').then(snap =>{
            var courseList = []
            snap.forEach((child) => {
                courseList.push(child.val().name)
           }) 
           this.setState({courses: courseList})

        })
    }

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const btnLogin=document.getElementById('btnLogin')
        const btnSignUp=document.getElementById('btnSignUp') 
        const btnLogOut=document.getElementById('btnLogOut')
        const btnUpdate = document.getElementById('btnUpdate')
        const txthandicap=document.getElementById('handicap')
        const txtcurrentComp=document.getElementById('txtcurrentComp')
        const displayname=document.getElementById('displayName')

        

        console.log(txtEmail, txtPassword, txthandicap)

        btnUpdate.addEventListener('click', e =>{
            var user=fire.auth().currentUser
            if(user){
            console.log(user.uid)
            var dbPlayerRef= dbRefPlayers.child(user.uid)
            dbPlayerRef.set({
                handicap: txthandicap.value,
                displayName: displayname.value,
                currentComp: txtcurrentComp.value,
                compCourse: this.state.compCourse
            })
        }
        })
        btnLogOut.addEventListener('click', e =>{
            fire.auth().signOut().then(function() {
                console.log('logged out')// Sign-out successful.
              }, function(error) {
                // An error happened.
                console.log(error)
              });
        })

        btnLogin.addEventListener('click', e =>{
            //get email and password
            const email=txtEmail.value
            const pass=txtPassword.value
            
            const auth=fire.auth()            

            const logPromise =auth.signInWithEmailAndPassword(email, pass)

            logPromise.catch(e => alert(e.message))
            logPromise.then(e =>{

                //alert('Logged in as ', e.uid)
                this.setState({open: true})
                })         

                                  
            
        })
        btnSignUp.addEventListener('click', e =>{
            //get email and password
            const email=txtEmail.value
            const pass=txtPassword.value
            
            const auth=fire.auth()            

            const logPromise =auth.createUserWithEmailAndPassword(email, pass)

            logPromise.catch(e => alert(e.message))

            logPromise.then(e =>{
                var dbPlayerRef= dbRefPlayers.child(e.uid)
                dbPlayerRef.set({
                    handicap: 18,
                    displayName: 'name',
                    currentComp: 'Alpha Test',
                    compCourse: that.state.compCourse
                })
                this.setState({open: true})
            })
        
        })

        



        //Add realtime Listner

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
               getplayerDetails(firebaseUser.uid).then((success) => {
                      this.setState({
                          displayName: success.displayName,
                          handicap: success.handicap,
                          currentComp: success.currentComp,
                          compCourse: success.compCourse
                      })   
                })
            
            this.setState({open: true})
            btnLogin.classList.add('hide')
            btnSignUp.classList.add('hide')
            btnLogOut.classList.remove('hide')
            

            }else{
            btnLogin.classList.remove('hide')
            btnSignUp.classList.remove('hide')
            btnLogOut.classList.add('hide')
            this.setState({open: false})
            }

        })

    }

    handleInputChange(event) {
        const target = event.target
        const name = target.name
        const value = target.value || ''
        console.log(name, value)
        that.setState({           
            [name]: value});
    }

    handleSelectName(value) {

        that.setState({
            compCourse: value.value
        })
        console.log(that.state.compCourse)
    }


    render () {
        
        return (

            <div> 
                <Panel id="login" collapsible expanded ={!this.state.open}>
                <Form inline> 
                <i>
                    <h3> Sign In</h3>
                    Sign in here to update your details and enter the current competition. If you don't have an account use the signup button to create one using an email address and password (your actual one or an invented one - it's only used for login authentication!) <br /><br /></i>        
                <input id="txtEmail" type="email" placeholder="username" />
                <input id="txtPassword" type="password" placeholder="****" /> <br />
                <Button bsStyle="primary" id="btnLogin" > Sign In </Button>
                <Button bsStyle="primary" id="btnSignUp" > Sign Up </Button> <br/><hr /> <br/>
                </Form>
                </Panel>
                <Panel id="details" collapsible expanded = {this.state.open}>
                    <h3> Enter Competition details below </h3>
                    <br />
                    <i>
                    Competition Name - not implemented for alpha test<br />
                    Display Name - your name as it will appear on the leaderboard <br />
                    Handicap - your playing handicap for the competition <br /><br />
                    </i>
                    <form class="form-horizontal">
                    <div class="col-xs-4">
                    <label>Competition Name</label>
                    <input id="txtcurrentComp" type="text"  name="currentComp" value={this.state.currentComp} disable/>
                    </div>
                    <div class="col-xs-4">  
                        <label>Course</label>               
                    <DropdownInput
                            options={this.state.courses}
                            defaultValue= {this.state.compCourse}
                            menuClassName='dropdown-input'
                            onSelect={this.handleSelectName}
                            placeholder='Select Course'
                            max={10}
                        />
                    </div>
                    <label>Player Name</label>
                    <input id="displayName" type="text" onChange={this.handleInputChange} name="displayName" value={this.state.displayName}/>
                    <label>Player Handicap</label>
                    <input id="handicap" type="number" onChange={this.handleInputChange} name="handicap" value={this.state.handicap}/> 
                    </form>
                    <br /><br />    
                    <Button bsStyle="primary" id="btnUpdate"> Update</Button>  
                    <Button bsStyle="primary" href='../oncourse'>Scorecard</Button>                         
                    <Button bsStyle="primary" id="btnLogOut" hide>Sign Out </Button>
                </Panel>
          
            
            </div>

        )
    }
}
    
    	
    
    

 
	


