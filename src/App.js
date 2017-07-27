import React from 'react';

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Players from './pages/players.js';
import Layout from './pages/layout.js';
import Featured from './pages/featured.js';
import Settings from './pages/settings.js';

import {Nav, NavItem, NavDropdown, MenuItem, Glyphicon} from 'react-bootstrap'




class App extends React.Component {

  render() {
    return (
      <Router >
        <div>
          <h1>FOGS Computer (prototype)</h1>
          <Nav bsStyle="tabs" >
          <NavItem href = "/">Layout</ NavItem>
          <NavItem href = "/featured">Featured</NavItem>
          <NavItem href = "/settings">Settings</NavItem>
          <NavDropdown eventKey="4" title="Players" id="nav-dropdown">
                <MenuItem href="player/fred">Fred</MenuItem>
                <MenuItem href="player/bert">Bert</MenuItem>
                <MenuItem href="player/john">John</MenuItem>
                <MenuItem divider />
                <MenuItem href="/">Homepage</MenuItem>
        </NavDropdown>
            <Nav pullRight>
                <NavItem href ='#'><Glyphicon glyph="log-in" /></NavItem>
            </Nav>
        </Nav>

 
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/player/:id' component ={Players} />
          <Route path ='/players' component = {Players} />
          <Route path ='/settings' component ={Settings} />
          <Route path ='/featured' component ={Featured} />
          <Route component ={Layout} />   {/* Catch all for non matched paths - returns to <Layout> */}
          </Switch>

        </div>
      </Router>
    );
  }
}




export default App;
