import React from 'react'

import fire from './fire.js'

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Layout from './pages/layout.js'


import LoginForm from './pages/loginform.js'


import OnCourse from './pages/oncourse.js'

import {Nav, NavItem, Glyphicon} from 'react-bootstrap'

//todo an item


class App extends React.Component {

  componentDidMount(){
    const menuLogin=document.getElementById('menu-login')

    const menuProfile=document.getElementById('menu-profile')

    fire.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser) {
      //console.log(firebaseUser)
      menuLogin.classList.add('hide')

      menuProfile.classList.remove('hide')
        }else{
      //console.log('not logged in')
      menuLogin.classList.remove('hide')
  
      menuProfile.classList.add('hide')
    
 
      }
  })
  }

  render() {
    return (
      <Router >
        <div>
          <Nav id='nav' bsStyle="pills">
          <NavItem id='menu-home' href = "/">Home</ NavItem>
          <NavItem href="/oncourse">Scorecard</ NavItem>
         <NavItem href ='/login' id='menu-profile'>User Profile</NavItem>
         <NavItem href ='/login' id='menu-login'><Glyphicon glyph="log-in" />SignIn</NavItem>

          </Nav>

 
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/login' component = {LoginForm} />
          <Route path ='/oncourse' component = {OnCourse} />
          <Route component ={Layout} />   {/* Catch all for non matched paths - returns to <Layout> */}
          </Switch>

        </div>
      </Router>
    );
  }
}




export default App;
