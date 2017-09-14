import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyCAb2_s5H7zON9ECQFQFrbP_RNUb4UV1Hg",
  authDomain: "realtimescorecard.firebaseapp.com",
  databaseURL: "https://realtimescorecard.firebaseio.com",
  projectId: "realtimescorecard",
  storageBucket: "realtimescorecard.appspot.com",
  messagingSenderId: "961394997117"
};
  var fire = firebase.initializeApp(config);


export default fire;