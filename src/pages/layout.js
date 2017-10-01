import React from "react"; 



 
export default class Layout extends React.Component {

	render () {

        return (
    <div id='front-page'>
       <h2>Realtime Leaderboard (V0.0.6 Alpha)</h2>

       <p>Welcome to the realtime leaderboard app. Use the app to keep track of score and Stableford points as you play and keep an eye on the leaderboard of players around you.</p>
       <p>The app is designed to work on all mobile phones and tablets. A continuous connection to the Internet is not required, with scores updated and synchronised when a connection is available.</p>
       <p>An account login is required to use the app. Go to 'Sign-In' for details. When uppdating your details on the profile page you must press the update button to record any change.</p>
       <p>Scores are entered from the 'Scorecard' page. Progress of other competitors on the same course are  displayed in the leaderboard as they enter their own scores - future versions will enable limited playing groups.</p> <h3>Release notes</h3><p>V0.0.6 removes the need for password authentication. Only user email now required to signup/signin</p><p>V0.0.5 provides for course selection - but there are some issues with IOS6 Browsers</p>
       <p><i>Important: Do not refresh the page once scores are entered as this will cause data to be lost. Scorecard data more than 12hours old is deleted automatically. Login details and user profile data are persisted.</i></p>

       <pre>(c)Phil Flavin 2017</pre>
     </div>
        );
    }	
    
}

	


