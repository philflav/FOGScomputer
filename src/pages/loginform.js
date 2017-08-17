import React from "react"; 

import fire from '../fire.js';

import {
    Panel, 
    Well,
    FormGroup, 
    InputGroup, 
    FormControl,
    Button,
    ButtonToolbar
        } from 'react-bootstrap'




 
export default class LoginForm extends React.Component {

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const btnLogin=document.getElementById('btnLogin')
        const btnLogout=document.getElementById('btnLogout')

        console.log(txtEmail, txtPassword, btnLogin)

        //Add login event

        btnLogin.addEventListener('click', e =>{
            //get email and password
            console.log('logging in')
            const email=txtEmail.value
            const pass=txtPassword.value
            const auth=fire.auth()            

            const logPromise =auth.signInWithEmailAndPassword(email, pass)

            logPromise.catch(e => console.log(e.message))

        })

        //Add logout event

        btnLogout.addEventListener('click', e =>{
            fire.auth().signOut()
        })

        //Add realtime Listner

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
            console.log(firebaseUser)
            btnLogout.classList.remove('hide')
            }else{
            console.log('not logged in')
            btnLogout.classList.add('hide')
            }
        })

    }


    render () {
        
        return (

            <div>          
                <input id="txtEmail" type="email" placeholder="username" />
                <input id="txtPassword" type="password" placeholder="****" />
                <ButtonToolbar>
                    <Button bsStyle="primary" id="btnLogin" > Login </Button>
                    <Button bsStyle="primary hide" id="btnLogout" > Logout </Button>
                </ButtonToolbar>
            </div>

        )
    }
}
    
    	
    
    

 
	


