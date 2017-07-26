import React from 'react';

//import { BrowserRouter as Router,  Route} from 'react-router-dom';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import Archives from './pages/archives.js';
import Layout from './pages/layout.js';
import Featured from './pages/featured.js';
import Settings from './pages/settings.js'




class App extends React.Component {

  render() {
    return (
      <Router >
        <div>
          <h1>Home</h1>
          <Link to="/">Home<br/></Link>
          <Link to="/featured">Featured<br/></Link>
          <Link to="/archive">Archive<br/></Link>
          <Link to="/settings">Settings</Link>
          <hr/>
          <Switch>  {/*A <Switch> renders the first child <Route> that matches. A <Route> with no path always matches.*/}
          <Route path ='/' exact component={Layout}/>
          <Route path ='/archive/:id' component ={Archives} />
          <Route path ='/archive' component = {Archives} />
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
