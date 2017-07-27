import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDY2SHBUBkhKhYZ_JqdEMyiBG0tkgATLg8",
    authDomain: "fogscomputer.firebaseapp.com",
    databaseURL: "https://fogscomputer.firebaseio.com",
    projectId: "fogscomputer",
    storageBucket: "fogscomputer.appspot.com",
    messagingSenderId: "1093265727119"
  };
  var fire = firebase.initializeApp(config);


export default fire;