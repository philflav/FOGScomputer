import React from "react"; 

import {Panel, Well} from 'react-bootstrap'

import fire from '../fire.js';

var dbRefMessages = fire.database().ref().child('messages');

export default class ChatInput extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            chatInput:''
        }
    }

textChangeHandler(event)  {
        this.setState({chatInput: event.target.value });
        console.log(this.state.chatInput)
      }
submitHandler(event) {
    event.preventDefault()

    this.props.onSend(this.state.chatInput)

    this.setState({chatInput: ''})

    const input=document.getElementById('input')

    input.blur()


}

render () {
    return (
        <div id='chat-input'>
        <form className="chat-input" onSubmit={this.submitHandler.bind(this)}>
        <input type="text" id="input"
          onChange={this.textChangeHandler.bind(this)}
          value={this.state.chatInput}
          placeholder="Write a message...(40chars max)"
          required />
      </form>
        </div>




    
    )

    
}

}