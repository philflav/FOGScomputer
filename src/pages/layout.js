import React from "react"; 



 
export default class Layout extends React.Component {

	render () {

        return (
    <div id='front-page'>
       <h2>Realtime Leaderboard (V0.0.4 Alpha)</h2>

       <p>Welcome to the realtime leaderboard app</p>
       <p>This app is designed to work mobile phones and tablets. A continuous connection to the Internet is not required, with scores updated and synchronised when a connection becomes available.</p>
       <p>An account login is required to use the app. Go to the 'Profile' page for details</p>
       <p>Scores are entered from the 'Scorecard' page. Progress of other competitors in the same competition is displayed in the leaderboard as they enter their own scores.</p>
       <p><i>Important: Do not refresh the page once scores are entered as this will cause data to be lost. Scorecard data more than 12hours old is deleted automatically. Login details and user profile data are persisted.</i></p>

       <pre>(c)Phil Flavin 2017</pre>
     </div>
        );
    }	
    
}

	


