import React from "react"; 

import {Well} from 'react-bootstrap'

 
export default class Layout extends React.Component {

	render () {

        return (
    <div id='front-page'>
        <Well>
       <h2>Realtime Leaderboard (V0.0.9 Alpha)</h2>

       <p>Welcome to the realtime leaderboard app. Use the app to keep track of score and Stableford points as you play and keep an eye on the leaderboard of players around you.</p>
       <p>The app is designed to work on all mobile phones and tablets. A continuous connection to the Internet is not required, with scores updated and synchronised when a connection is available.</p>
       <p>An account login is required to use the app. Go to 'Sign-In' for details.</p>
       <p>Scores are entered from the 'Scorecard' page. Progress of other competitors on the same course are  displayed in the leaderboard as they enter their own scores - future versions will enable limited playing groups.</p> <h3>Release notes</h3>
       <p>v0.0.9 <li>Score entry buttons hidden after 18th hole</li></p>
       <p>v0.0.8 <li>Bug fix - loading course details on profile page</li><li>Minor UI changes</li></p>
       <p>V0.0.7 <li>Changes to course selector on profile page to remove IOS6 bug.</li><li> Leaderboard now sorted high to low</li><li>Notification of hole data entry (button press) added</li></p>
       <p>V0.0.6 <li>removes the need for password authentication. Only user email now required to signup/signin</li></p>
       <p>V0.0.5 <li> provides for course selection - but there are some issues with IOS6 Browsers</li></p>
       <p><i>Important: Do not refresh the page once scores are entered as this will cause data to be lost. Scorecard data more than 12hours old is deleted automatically. Login details and user profile data are persisted.</i></p>

       </Well>

       <pre>(c)Phil Flavin 2017</pre>
     </div>
        );
    }	
    
}

	


