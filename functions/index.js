const functions = require('./node_modules/firebase-functions');

// This firebase server function removes and rtscore data that is more than 24 hours old.
// Each time a score is written to the database a timestamp is added. The function sorts by 
//timestamp and nullifies anything created befor the cutoff time. It is trggered on each write to the database.
exports.deleteOldItems = functions.database.ref('/rtscores/{id}')
.onWrite(event => {
  var ref = event.data.ref.parent; // reference to the items
  var now = Date.now();
  var cutoff = now - 12 * 60 * 60 * 1000; //delete anything more than 12 hours old
   var oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  return oldItemsQuery.once('value', function(snapshot) {
    // create a map with all childrenfirebase that need to be removed
    var updates = {};
    snapshot.forEach(function(child) {
      updates[child.key] = null
    });
    // execute all updates in one go and return the result to end the function
    return ref.update(updates);
  });
});