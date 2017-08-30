import React from "react"; 

import {Panel, Button} from 'react-bootstrap'
 

export default class Featured extends React.Component {

    handleClick (i,event) {
        console.log(i)

        var selectedButton = document.getElementById(i);
        selectedButton.setAttribute('disabled', true)

        alert(i)        
    }


    
    render () {
        var nums = [1,2,3,4,5,6,7,8,9,10,11,12]
        var ranNums = []
        var i = nums.length
        var j = 0
    
            while (i--) {
                j = Math.floor(Math.random() * (i+1));
                ranNums.push(nums[j]);
                nums.splice(j,1);
    }
        var items = ranNums.map(function(i) {
            return (
               
                <Button id={i} bsStyle="success" onClick={this.handleClick.bind(this, i)} >
                  ????
                </Button>
              
                
                );
        }, this);

        return (
            <div>
                 <Panel header="The Draw">
                 {items}
                 </Panel>

            </div>

        );
    }	
    
}

	


