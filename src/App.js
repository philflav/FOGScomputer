import React from 'react';

import { BrowserRouter as Router,  Route} from 'react-router-dom';

import Layout from './pages/layout.js';
import Featured from './pages/featured.js';
import Archives from './pages/archives.js';
import Settings from './pages/settings.js';




class App extends React.Component {
npm 
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={Layout} />
              <Route path="/featured" component={Featured} />
              <Route path="/archives" component={Archives} />
              <Route path="/settings" component={Settings} />
        </div>
      </Router>
    );
  }
}




export default App;
