import React from 'react';

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Players from './pages/players.js';
import Layout from './pages/layout.js';
import Featured from './pages/featured.js';
import Settings from './pages/settings.js';
import Leaderboard from './pages/leaderboard.js';
import LoginForm from './pages/loginform.js';

import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'

//todo an item


class App extends React.Component {

  render() {
    return (
      <Router >
        <div>
          <h1>FOGS Computer online V1</h1>
          <Nav bsStyle="pills" >
          <NavItem href = "/">Layout</ NavItem>
          <NavItem href = "/featured">Featured</NavItem>
          <NavDropdown title="Admin" id="nav-dropdown" bsClass="hide">
                <MenuItem href="/admin/player">Add/Update Player</MenuItem>
                <MenuItem href="/admin/course">Add/Update Course</MenuItem>
                <MenuItem href="/admin/comp>">Add/Update Competiton</MenuItem>
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
         <NavItem href ='/admin/login'><Glyphicon glyph="log-in" />Login</NavItem>
          </Nav>

 
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/:compName/:day/leaderboard' component = {Leaderboard} />
          <Route path ='/:compName/player/:playerName' component ={Players} />
          <Route path ='/players' component = {Players} />
          <Route path ='/featured' component ={Featured} />
          <Route path ='/admin/player' component = {Settings} />
          <Route path ='/admin/course' component = {Settings} />
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
