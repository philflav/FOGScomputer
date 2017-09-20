import React from "react"; 

import fire from '../fire.js';

import {  Well, Form, Button, } from 'react-bootstrap'

import getplayerDetails from '../functions/getplayerDetails.js'


var dbRefPlayers = fire.database().ref().child('player');

 
export default class LoginForm extends React.Component {

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const btnLogin=document.getElementById('btnLogin') 
        const btnUpdate = document.getElementById('btnUpdate')
        const txthandicap=document.getElementById('handicap')
        const txtCompName=document.getElementById('txtCompName')
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
                currentComp: txtCompName.value
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
                
                })
             

                                  
            
        })


        //Add realtime Listner

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
                var dbPlayerRef= dbRefPlayers.child(firebaseUser.uid)
                dbPlayerRef.set({
                    handicap: txthandicap.value,
                    displayName: displayname.value,
                    currentComp: txtCompName.value
                })
                getplayerDetails(firebaseUser.uid).then((success) => {
                        alert('logged in'+ success.displayName)
 
                })
            

            btnLogin.classList.add('hide')
            

            }else{
            console.log('not logged in')
            btnLogin.classList.remove('hide')
            }

        })

    }


    render () {
        
        return (

            <div> 
                <Well>  
                <Form inline> 
                <i>
                    <h3> Sign In</h3>
                    Sign in here in order to update your details for the current competition <br /><br /></i>        
                <input id="txtEmail" type="email" placeholder="username" />
                <input id="txtPassword" type="password" placeholder="****" /> 
                <Button bsStyle="primary" id="btnLogin" > Login </Button>  <br/><hr /> <br/>

                <h3> Enter Competition details below </h3>
                <br />
                <i>
                Competition Name - exactly as specified by the organiser<br />
                Display Name - your name as it will appear on the leaderboard <br />
                Handicap - your playing handicap for the competition <br /><br />
                </i>

                <input id="txtCompName" type="text" placeholder="competition name"/>
                <input id="displayName" type="text" placeholder ="your display name" />
                <input id="handicap" type="number" placeholder = "your playing handicap"/> 
                <Button bsStyle="primary" id="btnUpdate"> Update Details </Button> <br />                           
     
                </Form>
                </Well>
            </div>

        )
    }
}
    
    	
    
    

 
	


