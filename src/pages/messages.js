import React from "react"; 

import Message from './message.js'

require ('../CSS/chat.css')


export default class Messages extends React.Component {
 
    componentWillReceiveProps() {

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