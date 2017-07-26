import React from "react"; 




 
export default class Archives  extends React.Component {

	render () {

         return (
    <div>
       <h1> Archives </h1>

      <p> This page is the archive for {this.props.match.params.id || 'no one'} </p>

    </div>

        )
    }	
    
}

	


