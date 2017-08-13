import fire from '../fire.js';



var dbRefPlayers = fire.database().ref().child('player');
var dbRefComps = fire.database().ref().child('comp');
var dbRefScorecards = fire.database().ref().child('scorecard');
var dbRefCourses = fire.database().ref().child('course');


function getscorecard(scn) { 

return new Promise(function(resolve, reject) {

//console.log('getscorecard: ', scn)
var playerId = ""
var courseId = ""
var PlayerForename = ""
var PlayerSurname = ""
var CourseName = ""
var ScoreCard  = ""
var total = ""
var points = ""
var par3s = ""
var handicap = ""
var F1= ""

//var courseName
var scnRef = dbRefScorecards.orderByChild('scorecard_id').equalTo(scn).once('value').then (snap => {
    //console.log(snap.val())
    snap.forEach((child) =>{   
                playerId=child.val().player_id          
                courseId=child.val().course_id
                total=child.val().tot
                points = child.val().pts
                par3s = child.val().par3s||0
                handicap = child.val().hcap
                F1 = child.val().F1

                var CRef = dbRefCourses.orderByChild('Course_id').equalTo(courseId).once('value').then(snap => {
                        snap.forEach((child) =>{
                        CourseName=child.val().CourseName  
                        //console.log(courseId, CourseName)                          
                   })    
                })
                var Pref = dbRefPlayers.orderByChild('player_id').equalTo(playerId).once('value').then( snap =>{
                    snap.forEach((child) =>{
                        PlayerForename=child.val().forename
                        PlayerSurname=child.val().surname
                        ScoreCard = {
                            'PlayerName': PlayerForename+' '+PlayerSurname,
                            'playerId': playerId,
                            'total': total,
                            'points': points,
                            'par3s': par3s,
                            'handicap': handicap,
                            'F1': F1,
                            'CourseName': CourseName, 
                            'courseId': courseId,
                             }
                        resolve(ScoreCard)
                    })
                }) 
                
             })
        })
          
                .catch(function(err) {    
                    reject(err)
})
})
}




export default getscorecard;