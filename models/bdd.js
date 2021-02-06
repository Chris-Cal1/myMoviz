const mongoose = require('mongoose');

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

 


// --------------------- BDD -----------------------------------------------------
mongoose.connect('mongodb+srv://chris:NRjEAT0ps4X3ELhI@cluster0.4z8nd.mongodb.net/mymovizap?retryWrites=true&w=majority',
   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database Mymoviz connection : Success ***');
    }
   }
);

module.exports = mongoose