import React from "react"; 

import {Panel, Well} from 'react-bootstrap'

import fire from '../fire.js';

import Message from './message.js'

require ('../CSS/chat.css')

var messagesRef = fire.database().ref('messages').orderByKey().limitToLast(30);

export default class Messages extends React.Component {
    constructor(props){
        super(props)
    }
     

    componentWillReceiveProps() {
        // get the messagelist container and set the scrollTop to the height of the container

      }

render () {

    const messages = this.props.messages.map((message,i) => {
        return (
            <Message key={i}
            username = {message.username}
            message = {message.message}
            timestamp = {message.timestamp} />
        )
    })
    return (
        <div className='messages' id='messageList'>
        { messages }
      </div>




    
    )

    
}

}