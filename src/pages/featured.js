import React from "react"; 

import Hole from './hole.js'
 
var holeData =[]

//This js is being used as a component test only.
export default class Featured extends React.Component {
    constructor(props){
        super(props)

        this.state = {test: 'Goodbye',
                      number: 1,
                      par: 4,
                      SI: 17,
                      key: 33}
    }

    handlechange(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        console.log(target)
        this.setState({
           
            [name]: value});
       

    }
        

    saveData(event){
        event.preventDefault()
        console.log('Saving :',this.state.key, this.state.SI, this.state.par)
        for(var i=0;i<10;i++){
            holeData.push(<Hole number={i}  hkey={this.state.key} par={this.state.par} SI={this.state.SI}/>)
            }
    }

    
    render () {

        return (
            <div>
                  <form onSubmit ={this.saveData.bind(this)}>
                    <td>{this.state.number+1} </td>                             
                    <td><input style = {{"width":"100px"}} ref={this.state.key} name="par" value={this.state.par} onChange={this.handlechange.bind(this)}/> </td>
                    <td><input style = {{"width":"100px"}} ref={this.state.key} name="SI" value={this.state.SI} onChange={this.handlechange.bind(this)}/> </td>
                    <td>
                    <button type="submit">  Save</button>
                    </td>
                    </form>   
                    {holeData}    

            </div>

        );
    }	
    
}

	


