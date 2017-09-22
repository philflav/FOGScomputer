import React from "react"; 

import fire from '../fire.js';

import {  Panel, Well, Form, Button, } from 'react-bootstrap'

import getplayerDetails from '../functions/getplayerDetails.js'


var dbRefPlayers = fire.database().ref().child('player');
var that
 
export default class LoginForm extends React.Component {

    constructor(props){
        super(props)
        this.state=({
            open: false,
            displayName: 'Display Name',
            handicap: 0,
            compCourse: 'FFGC Martello',
            currentComp: 'Alpha test'

        })
        that=this
    }

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const txtcompCourse=document.getElementById('txtcompCourse')
        const btnLogin=document.getElementById('btnLogin')
        const btnSignUp=document.getElementById('btnSignUp') 
        const btnLogOut=document.getElementById('btnLogOut')
        const btnUpdate = document.getElementById('btnUpdate')
        const txthandicap=document.getElementById('handicap')
        const pnldetails=document.getElementById('details')
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
                compCourse: txtcompCourse.value
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
                    displayName: displayname.value,
                    currentComp: txtcurrentComp.value,
                    compCourse: txtcompCourse.value
                })
                this.setState({open: true})
            })
        
        })

        



        //Add realtime Listner

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
                var dbPlayerRef= dbRefPlayers.child(firebaseUser.uid)
                /*dbPlayerRef.set({
                    handicap: txthandicap.value,
                    displayName: displayname.value,
                    currentComp: txtCompName.value
                })*/
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

                    <input id="txtcurrentComp" type="text"  name="currentComp" value={this.state.currentComp} disable/>
                    <input id="txtcompCourse" type="text" onChange={this.handleInputChange} name="compCourse" value={this.state.compCourse} />
                    <input id="displayName" type="text" onChange={this.handleInputChange} name="displayName" value={this.state.displayName}/>
                    <input id="handicap" type="number" onChange={this.handleInputChange} name="handicap" value={this.state.handicap}/> 
                    <br /><br />
                    <Button bsStyle="primary" id="btnUpdate"> Update</Button>  
                    <Button bsStyle="primary" href='../oncourse'>Scorecard</Button>                         
                    <Button bsStyle="primary" id="btnLogOut" hide>Sign Out </Button>
                </Panel>
          
            
            </div>

        )
    }
}
    
    	
    
    

 
	


