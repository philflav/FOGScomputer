import firebase from 'firebase'

  // Initialize Firebase (FOGSComputer)
  //  My details removed - add your own if reqired
  var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
  };
  var fire = firebase.initializeApp(config);



export default fire;
