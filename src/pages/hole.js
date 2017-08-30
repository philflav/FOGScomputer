import React from "react"; 

import fire from '../fire.js';
import {Button} from 'react-bootstrap'


export default class Hole extends React.Component {

    constructor(props){
     super(props) 
     this.state= {
        par: props.par,
        SI: props.SI,
        key: props.hkey,
        number: props.number}
        console.log("Constructor :",this.state)
    }

    componentWillReceiveProps(nextProps) {
        this.state= {
            par: nextProps.par,
            SI: nextProps.SI,
            key: nextProps.hkey,
            number: nextProps.number
        }
    }

    handlechange(event) {
        const target = event.target
        const name = target.name
        const value = target.value.substr(0,2)
        console.log(name, value, target)
        this.setState({
           
            [name]: value});      
      
    }

    saveData(event){
        event.preventDefault()
        console.log('Saving :',this.state.key, this.state.SI, this.state.par)
        var update ={SI: this.state.SI,
                    par: this.state.par}
        console.log(this.state.key," : ", update)
        fire.database().ref(/hole/+this.state.key).update(update)
        .catch(e =>{
        console.log(e)
       })
        
    }
    render () {
        return (
                    
                    <tr>
                    <td style = {{"width":"40px"}}>{this.state.number+1} </td>                             
                    <td ><input style = {{"width":"40px"}} type="number" ref={this.state.key} name="par" value={this.state.par} onChange={this.handlechange.bind(this)}/> </td>
                    <td ><input style = {{"width":"40px"}}type="number" ref={this.state.key} name="SI"  value={this.state.SI} onChange={this.handlechange.bind(this)}/> </td>
                    <td style = {{"width":"20px"}}></td>
                    <td><Button bsStyle="primary" onClick={this.saveData.bind(this)}>Save</Button></td>
                    </tr>
                      
            
        )
    }
}
