
import fire from '../fire.js';

var dbRefPlayers = fire.database().ref().child('player');

function getplayerDetails(uid) {

    //get player name for loggedin user with uid

    return new Promise(function(resolve, reject){

    var dbRefPlayer= dbRefPlayers.orderByChild('uid').equalTo(uid)
    dbRefPlayer.once('value').then(snap =>{
        snap.forEach((child) =>{
            //console.log(child.val())
        resolve(child.val())
                 })
            })
    .catch(function(err){
        reject(err)
    })
})
}

export default getplayerDetails