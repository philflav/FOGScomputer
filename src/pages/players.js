import React from "react"; 






 
export default class Players  extends React.Component {

    const 

	render () {

         return (
    <div>
       <h1> Players </h1>

      <p> This page is the player page for {this.props.match.params.id || 'no one'} </p>


    </div>

        )
    }	
    
}

	


