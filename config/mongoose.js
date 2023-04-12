//first require the mongoose library
const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/codeial_development";

//now create a connection to mongoDB 
mongoose.connect(url);

//now aquire the instance of conncetion in a veriable
const db = mongoose.connection;

//if any error occured
db.on('error', console.error.bind(console,'error connecting to the server'));

//notify when connected successfully
db.once('open', function(){
    console.log('connected to mongodb server')
})

module.exports = db;