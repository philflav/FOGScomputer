class ResultRow extends React.Component {
  render() {    
    return (
      <tr>        
        <td>{this.props.results.name}</td>
        <td>{this.props.results.points}</td>
        <td>{this.props.results.F1}</td>
        <td>{this.props.results.par3s}</td>
      </tr>
    );
  }
}

class DayTable extends React.Component {
  render() {
   var rows = []; 
   this.props.results.forEach(function(result) {      
      rows.push(<ResultRow results={result} key={result.name} />);      
    });
    return (
      <div>
        <h3>Day result</h3>
      <table>
            <thead>
            <tr>
            <th> Name </th>
            <th> Points </th>
            <th> F1 </th>
            <th> Par3s</th>
            </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
      </div>
    );
  }
}

class OverallTable extends React.Component {
  render() {
   var rows = []; 
   this.props.results.forEach(function(result) {      
      rows.push(<ResultRow results={result} key={result.name} />);      
    });
    return (
      <div>
        <h3>Overall Standings </h3>
      <table>
            <thead>
            <tr>
            <th> Name </th>
            <th> Points </th>
            <th> F1 </th>
            <th> Par3s</th>
            </tr>
          </thead>
        <tbody>{rows}</tbody>
      </table>
       </div>
    );
  }
}




class Leaderboard extends React.Component {

   
constructor(props) {
    super(props);
        

    //get competition and player names from URL.
        
    this.state = { compName: this.props.match.params.compName };
 

    } 

     componentWillMount() {
        console.log(this.state.compName)        
        var dbRefComp = dbRefComps.orderByChild('name').equalTo(this.state.compName);
        var cards = [];
                dbRefComp.once('value').then(snap => {
            
                    snap.forEach((child) => {
                    //console.log("Scorecard numbers",child.val())      
                    cards.push(child.val().SC1)
                    cards.push(child.val().SC2)
                    cards.push(child.val().SC3)
                    cards.push(child.val().SC4)

            })
                   //console.log("Cards: ",cards)
                    for (var i = 0; i < 12; i++) {               
                    getscorecard(cards[i*4]).then(function(results) {

                        RESULTS.push(results)
                    })


                    //console.log("Returned props",props)
                   
            }
        })
            
   
            //display sorted leaderboard for each player

        
                /*
           console.log('DAY2')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][1]).then(function(value) {
                    console.log(value)
                     {<Result />}
                 })
            }

            console.log('DAY3')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][2]).then(function(value) {
                    console.log(value)
                     {<Result />} 
                 })
            }
            console.log('DAY4')
            for (var i = 0; i < cards.length; i++) {               
                getscorecard(cards[i][3]).then(function(value) {
                    console.log(value)
                     {<Result />}
                 })
            } */
                
        }
  render() {
    return (
      <div> 
        <h1> Leaderboard </h1>
        <table>

          <tbody>
        <tr>
          <td>
        <DayTable results={this.props.results} />
          </td>
          <td>
        <OverallTable results={this.props.results} />
          </td>
         </tr>
          </tbody>
        </table>
      </div>
    );
  }
}



var RESULTS = [
  {name: 'Phil Flavin', points: 29, F1: 4, par3s: 12},
  {name: 'Simon m', points: 33, F1: 3, par3s: 6},
  {name: 'Basil McClean', points: 35, F1: 10, par3s: 9},
  {name: 'Paul Aldous', points: 29, F1: 4, par3s: 14},
  {name: 'Roger Mayhew', points: 29, F1: 4, par3s: 11},
  {name: 'Paul Grant', points: 29, F1: 4, par3s: 4},
  {name: 'Erik Hanson', points: 29, F1: 4, par3s: 7},
  {name: 'Ian Buxton', points: 29, F1: 4, par3s: 7},
  {name: 'Jim Harrison', points: 29, F1: 4, par3s: 9},
  {name: 'Steve Livermore', points: 29, F1: 4, par3s: 10},
  {name: 'Steve Boswell', points: 29, F1: 4, par3s: 1},
  {name: 'Tony Dann', points: 29, F1: 4, par3s: 13}
]

 
ReactDOM.render(
  <Leaderboard results={RESULTS} />,
  document.getElementById('container')
);