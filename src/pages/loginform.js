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
            displayName: 'name to show on leaderboard',
            handicap: 0,
            compCourse: 'FFGC Martello',
            currentComp: 'TEST'

        })
        that=this
    }

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const txtcompCourse=document.getElementById('txtcompCourse')
        const btnLogin=document.getElementById('btnLogin')
        const btnSignUp=document.getElementById('btnSignUp')  
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


        btnLogin.addEventListener('click', e =>{
            //get email and password
            const email=txtEmail.value
            const pass=txtPassword.value
            
            const auth=fire.auth()            

            const logPromise =auth.signInWithEmailAndPassword(email, pass)

            logPromise.catch(e => alert(e.message))
            logPromise.then(e =>{

                alert('Logged in as ', e.uid)
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
            

            }else{
            console.log('not logged in')
            btnLogin.classList.remove('hide')
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
                <Well>  
                <Form inline> 
                <i>
                    <h3> Sign In</h3>
                    Sign in here to update your details and enter the current competition. If you don't have an account use the signup button to create one using an email address and password (your actual one or an invented one - it's only used for login authentication!) <br /><br /></i>        
                <input id="txtEmail" type="email" placeholder="username" />
                <input id="txtPassword" type="password" placeholder="****" /> <br />
                <Button bsStyle="primary" id="btnLogin" > Sign In </Button>.  |  .
                <Button bsStyle="primary" id="btnSignUp" > Sign Up </Button> <br/><hr /> <br/>
                <Panel id="details" collapsible expanded = {this.state.open}>
                    <h3> Enter Competition details below </h3>
                    <br />
                    <i>
                    Competition Name - exactly as specified by the organiser<br />
                    Display Name - your name as it will appear on the leaderboard <br />
                    Handicap - your playing handicap for the competition <br /><br />
                    </i>

                    <input id="txtcurrentComp" type="text" onChange={this.handleInputChange} name="currentComp" value={this.state.currentComp} />
                    <input id="txtcompCourse" type="text" onChange={this.handleInputChange} name="compCourse" value={this.state.compCourse} />
                    <input id="displayName" type="text" onChange={this.handleInputChange} name="displayName" value={this.state.displayName}/>
                    <input id="handicap" type="number" onChange={this.handleInputChange} name="handicap" value={this.state.handicap}/> 
                    <Button bsStyle="primary" id="btnUpdate"> Update Details </Button> <br />                           
                </Panel>
                </Form>
                </Well>
            </div>

        )
    }
}
    
    	
    
    

 
	


