import React from "react"; 

import fire from '../fire.js';

import {  Well, Form, Button, } from 'react-bootstrap'




 
export default class LoginForm extends React.Component {

    componentDidMount(){

        const txtEmail=document.getElementById('txtEmail')
        const txtPassword=document.getElementById('txtPassword')
        const btnLogin=document.getElementById('btnLogin')


        console.log(txtEmail, txtPassword, btnLogin)

        //Add login event

        btnLogin.addEventListener('click', e =>{
            //get email and password
            console.log('logging in')
            const email=txtEmail.value
            const pass=txtPassword.value
            const auth=fire.auth()            

            const logPromise =auth.signInWithEmailAndPassword(email, pass)

            logPromise.catch(e => alert(e.message))

        })

        //Add realtime Listner

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
            console.log(firebaseUser)
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
                <input id="txtEmail" type="email" placeholder="username" />
                <input id="txtPassword" type="password" placeholder="****" />                              
                <Button bsStyle="primary" id="btnLogin" > Login </Button>       
                </Form>
                </Well>
            </div>

        )
    }
}
    
    	
    
    

 
	


