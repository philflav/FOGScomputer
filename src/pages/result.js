import React from "react"; 

import {Panel, Well} from 'react-bootstrap'

export default class Result extends React.Component {

    constructor(props) {
    super(props)
    }


render () {
    const title =this.props.CourseName;
    console.log("Props: ",this.props)
    return (        
        <div>
                 <h3> Result {title}</h3>
                 {this.props.points} {this.props.F1} {this.props.par3s}  
            
        </div>
    )
    }
}
