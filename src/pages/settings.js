import React from "react"; 

import {Link} from 'react-router-dom';


 
export default class Settings extends React.Component {


    render () {
        console.log(this.props);
        return (
            <div>
       <h1> Settings </h1>

       <Link to="archives"> <button>Archives</button> </Link>
       <Link to="settings"> <button>Settings</button> </Link>

       
       <p> This page is settings </p>
       </div>

        );
    }	
    
}
 
	


