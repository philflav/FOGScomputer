import React from "react"; 

export default class Player extends React.Component {

render () {

    return (
        
        <div>
            <h1> Database Record for {this.props.forename}</h1>
            <h3>{this.props.forename} {this.props.surname} </h3>

            Latest handicap recorded is {this.props.handicap}
            <br/>
            Phone: {this.props.phone}  email: {this.props.email}
        </div>
    )
}

    
}