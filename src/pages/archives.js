import React from "react"; 

import {Link} from 'react-router-dom';


 
export default class Archives extends React.Component {

	render () {

        return (
            <div>
       <h1> Archives </h1>

       <Link to="archives"> <button>Archives</button> </Link>
       <Link to="settings"> <button>Settings</button> </Link>

      <p> This page is archives</p>

       </div>

        );
    }	
    
}

	


