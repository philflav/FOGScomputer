function stableford(hcap, score, par, SI) {
 
    var x;

        if (score>0){
            x=par-score
        } else {
   
            return 0;
        }
        if(hcap>18){
            if (hcap-18 >=SI) {
                x=x+4;
            }else{
                x=x+3;
            }
        }else{
            if (hcap>=SI) {
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
        
