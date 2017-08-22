import React from 'react'

import fire from './fire.js'

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Players from './pages/players.js'
import Layout from './pages/layout.js'
import Featured from './pages/featured.js'
import Settings from './pages/settings.js'
import Leaderboard from './pages/leaderboard.js'
import LoginForm from './pages/loginform.js'
import EditPlayer from './pages/editplayer.js'
import EditCourse from './pages/editcourse.js'

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
          <NavItem href = "/">Layout</ NavItem>
          <NavItem href = "/featured">Featured</NavItem>
          <NavDropdown title="Admin" id="admin-nav-dropdown" bsStyle="hide">
                <MenuItem href="/admin/player">Add/Update Player</MenuItem>
                <MenuItem href="/admin/course">Add/Update Course</MenuItem>
                <MenuItem href="/admin/comp>">Add/Update Competition</MenuItem>
          </NavDropdown>
          <NavDropdown title="Recent players" id="nav-dropdown">
                <MenuItem href="/FOGS2017/player/Flavin">Flavin</MenuItem>
                <MenuItem href="/FOGS2017/player/McClean">McClean</MenuItem>
                <MenuItem href="/FOGS2017/player/Mahoney">Mahoney</MenuItem>
                <MenuItem divider />
                <MenuItem href="/">Homepage</MenuItem>
         </NavDropdown>
         <NavDropdown title="2017 Leaderboard" id="navdropdown">
                <MenuItem href="/FOGS2017/1/leaderboard">2017 Day 1</MenuItem>
                <MenuItem href="/FOGS2017/2/leaderboard">2017 Day 2</MenuItem>
                <MenuItem href="/FOGS2017/3/leaderboard">2017 Day 3</MenuItem>
                <MenuItem href="/FOGS2017/4/leaderboard">2017 Day 4</MenuItem>
         </NavDropdown>
         <NavItem href ='/admin/login' id='menu-login'><Glyphicon glyph="log-in" />SignIn</NavItem>
         <NavItem href ='#' id='menu-logout'><Glyphicon glyph="log-out" />SignOut</NavItem>
          </Nav>

 
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/:compName/:day/leaderboard' component = {Leaderboard} />
          <Route path ='/:compName/player/:playerName' component ={Players} />
          <Route path ='/players' component = {Players} />
          <Route path ='/featured' component ={Featured} />
          <Route path ='/admin/player' component = {EditPlayer} />
          <Route path ='/admin/course' component = {EditCourse} />
          <Route path ='/admin/comp' component = {Settings} />
          <Route path ='/admin/login' component = {LoginForm} />
          <Route component ={Layout} />   {/* Catch all for non matched paths - returns to <Layout> */}
          </Switch>

        </div>
      </Router>
    );
  }
}




export default App;
