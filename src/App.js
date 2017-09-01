import React from 'react'

import fire from './fire.js'

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Players from './pages/players.js'
import Layout from './pages/layout.js'
import Draw from './pages/draw.js'
import Leaderboard from './pages/leaderboard.js'
import LoginForm from './pages/loginform.js'
import EditPlayer from './pages/editplayer.js'
import EditCourse from './pages/editcourse.js'
import Comp from './pages/comp.js'

import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'

//todo an item


class App extends React.Component {

  componentDidMount(){
    const menuLogin=document.getElementById('menu-login')
    const menuLogout=document.getElementById('menu-logout')
    const adminNav=document.getElementById('admin-nav-dropdown')

    menuLogout.addEventListener('click', e =>{
      fire.auth().signOut()
  })

    fire.auth().onAuthStateChanged(firebaseUser =>{
      if(firebaseUser) {
      //console.log(firebaseUser)
      adminNav.classList.remove('hide')  
      menuLogin.classList.add('hide')
      menuLogout.classList.remove('hide')
      }else{
      //console.log('not logged in')
      adminNav.classList.add('hide')
      menuLogin.classList.remove('hide')
      menuLogout.classList.add('hide')
      }
  })
  }

  render() {
    return (
      <Router >
        <div>
          <h1>FOGS Computer online V1</h1>
          <Nav bsStyle="pills" >
          <NavItem href = "/">Home Page</ NavItem>
          <NavItem href = "/draw/FOGS2017">Current Draw</NavItem>
          <NavDropdown title="Admin" id="admin-nav-dropdown" bsStyle="hide">
                <MenuItem href="/admin/player">Add/Update Player</MenuItem>
                <MenuItem href="/admin/course">Update Course</MenuItem>
        </NavDropdown>
         <MenuItem href="/comps">Competitions Summary</MenuItem>
         <NavItem href ='/admin/login' id='menu-login'><Glyphicon glyph="log-in" />SignIn</NavItem>
         <NavItem href ='#' id='menu-logout'><Glyphicon glyph="log-out" />SignOut</NavItem>
          </Nav>

 
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/draw/:compName' component = {Draw} /> 
          <Route path ='/:compName/:day/leaderboard' component = {Leaderboard} />
          <Route path ='/:compName/player/:playerName' component ={Players} />
          <Route path ='/comps' component = {Comp} />
          <Route path ='/:compName' component = {Comp} />
          <Route path ='/players' component = {Players} />
          <Route path ='/admin/player' component = {EditPlayer} />
          <Route path ='/admin/course' component = {EditCourse} />
          <Route path ='/admin/login' component = {LoginForm} />
          <Route component ={Layout} />   {/* Catch all for non matched paths - returns to <Layout> */}
          </Switch>

        </div>
      </Router>
    );
  }
}




export default App;
