import React from "react"; 

import fire from '../fire.js';
import getplayerDetails from '../functions/getplayerDetails.js'

require ('../CSS/chat.css')


export default class Message extends React.Component {
    constructor(props){
        super(props)

        this.state = {playername:'not found'}

        fire.auth().onAuthStateChanged(firebaseUser =>{
            if(firebaseUser) {
    
                getplayerDetails(firebaseUser.uid).then((success) => {
    
                        this.setState({playername: success.displayName,
                        hcap: success.handicap,
                        currentComp: success.currentComp
                    })
    
                })
            }
        })
    }
  
    
    

render () {
    var dt=Math.round((Date.now()-this.props.timestamp)/60000)

    var fromMe = ''
    if(this.props.username === this.state.playername)fromMe = 'from-me'
            // get the messagelist container and set the scrollTop to the height of the container
          
    return (
<div className={`message ${fromMe}`}>
 
        <div className='username'>
          { this.props.username } - {dt}Mins ago
        </div>  
        <div className='message-body'>
          { this.props.message }
        </div>
      </div>
    )

    
}

}