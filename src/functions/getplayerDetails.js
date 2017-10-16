
import fire from '../fire.js';

var dbRefPlayers = fire.database().ref().child('player');

function getplayerDetails(uid) {

    //get player name for logged in user with uid
    console.log(uid)
    return new Promise(function(resolve, reject){

    var dbRefPlayer= dbRefPlayers.child(uid)
    dbRefPlayer.once('value').then(snap =>{
        resolve(snap.val())                
            })
    .catch(function(err){
        reject(err)
    })
})
}

export default getplayerDetails