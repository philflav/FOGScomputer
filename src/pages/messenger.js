import React from "react"; 

import fire from '../fire.js';

import getplayerDetails from '../functions/getplayerDetails.js'

import ChatInput from './chatinput.js'
import Messages from './messages.js'

require ('../CSS/chat.css')

var dbRefMessages = fire.database().ref().child('messages');
var username

export default class Messenger extends React.Component {

    constructor (props) {
        super(props)
         this.state ={
             messages: [],
             sendHandler: ''
         }
         fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
    
                getplayerDetails(firebaseUser.uid).then((success) => {

                    username = success.displayName
   
                })
            } else
            {
                username = 'Anonymous'
            }
        })

    }

    componentDidMount(){
        dbRefMessages.on('child_added', snap => {
            let message = {id: snap.key, username: snap.val().username, message: snap.val().message, timestamp: snap.val().timestamp}
        
        //this.setState({ messages: [message].concat(this.state.messages) })
        this.setState({ messages: [message].concat(this.state.messages) })
        })
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }
sendHandler(message){
    console.log('Sending ', message)

    let msg = {username: username, message: message, timestamp: Date.now()}

    //todo add timestamp field
    dbRefMessages.push(msg)
}

render () {

    return (
        
    <div>
        <div>
 
            <div id='input-field'>
     <ChatInput onSend={this.sendHandler} />
     <br />
        </div>
     <Messages messages={this.state.messages}  />
        </div>


    </div>
    
    )

    
}

}