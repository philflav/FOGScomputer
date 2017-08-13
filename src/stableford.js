/**
 * 
 * @param {*} handicap of player
 * @param {*} shots taken
 * @param {*} par of hole
 * @param {*} SI of hole
 * returns Stableford points 
 */
function stableford(handicap, shots, par, SI) {
 
    var x;

        if (shots>0){
            x=par-shots
        } else {
   
            return 0;
        }
        if(handicap>18){
            if (handicap-18 >=SI) {
                x=x+4;
            }else{
                x=x+3;
            }
        }else{
            if (handicap>=SI) {
                x=x+3;
            }else{
                x=x+2;
            }   
        }
        if (x>0) {
    
            return x;
        }else {
        
            return 0;
        }
    };



export default stableford
        
