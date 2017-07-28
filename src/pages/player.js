import React from "react"; 

import {Panel, Well} from 'react-bootstrap'

export default class Player extends React.Component {

render () {
    const title =this.props.forename+' '+this.props.surname ;
    return (        
        <div>
            <Panel header={title}  bsStyle="primary">          
            <Well bsSize="small">Latest handicap recorded is {this.props.handicap} </Well>
            <Well bsSize="small" > Phone: {this.props.phone} </Well > 
            <Well bsSize="small">  email: {this.props.email} </Well>
            </Panel>
        </div>
    )
}

    
}