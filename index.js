//first install express in your project by this command in terminda -> npm install express
//now in your entry file, index.js, require the express library by following code
const express = require("express");

// after requireing the express library, now you need to create the server or app by express
const app = express();

// now define a port
const port = 8000;

// now first create a router in the routes folder and then exports the router
// and import the router here and tell the app that all the routes will be handle by this router
app.use('/',require('./routes/index'));

// make your server listen to that port and when it does it should notify you
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in starting the server: ${err}`); //here i use backtip`` instead of "" to use ${} this function
    return;
  }
  console.log(`Server is up and running on port: ${port}`);
  return;
});
// i have specified the "start" keyword to "nodemon index.js" command
// now whenever i write "npm start" in bash , it will execute "nodemon index.js" command
//i have done this by package.json file
//for specifing any keyword go to package.json file and then scripts
// in scripts just append your keyword by this syntex -> "key":"command"

