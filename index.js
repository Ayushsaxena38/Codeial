//first install express in your project by this command in terminda -> npm install express
//now in your entry file, index.js, require the express library by following code
const express = require("express");

// after requireing the express library, now you need to create the server or app by express
const app = express();

// now define a port
const port = 8000;

//require the database connection here
const db = require('./config/mongoose');

//require express-session used for session cookie 
const session = require('express-session');
//require passport
const passport = require('passport');
//require passport-local
const  passportLocal = require('./config/passport-local-strategy');

//require connect-mongo here
const MongoStore = require('connect-mongo');

//require the node-sass-middleware here
const sassMiddleware = require('node-sass-middleware');

//to access the cookies and alter the cookies, first you need to install the cookie-parser
//and after installing, you have to require/import it here
const cookieParser = require('cookie-parser');

//to use layouts in ejs, first you need to install the required library which is called 'express-ejs-layouts'
//to install express-ejs-layouts library , write 'npm install express-ejs-layouts' in terminal/bash
//after installing the library , now require express-ejs-layouts here
const expressLayouts = require('express-ejs-layouts');
//now we have got our library, now we have to tell our app/server to use it
// for that we have to write the following command 
app.use(expressLayouts);//<= this needs to be done before the routes middleware

//create the node-sass-middleware before the express.static() middleware
app.use(sassMiddleware({
  src : './assets/scss',
  dest : './assets/css',
  debug : true, //<-- this will turn to false when deploye to production
  outputStyle : 'expanded',
  prefix : '/css'
}))

//to use static files in ejs, first you need to tell app/server to use static files in assets folder which is neighbouring to the server file
app.use(express.static(__dirname + '/assets'));

//to access the req.body you have to use this command 
app.use(express.urlencoded());

//now you have to tell the browser that use cookieParser() via middleWare
app.use(cookieParser());

app.use(session({//<-- this middleware is creating the session and save it to cookie and with the help of connect-mongo(MongoStore) this middleware is saving the session details to dabase server so thet it could survive the server restart
  name : "codial",
  //TODO change the secret before deployment in production mode
  secret : "blahsomething",
  saveUninitialized : false,
  resave : false,
  cookie : {
    maxAge : (1000 * 60 *60)//<-- max age is 60 mins 
  },
  store :MongoStore.create(//<== it is done by connect-mongo library, to make our session cookie or session login servives the restart of server
    {
      mongoUrl : "mongodb://127.0.0.1:27017/codeial_development",//<-- here you need to give the mongoose connection link which you have used in mongoose.js file
      autoRemove : 'disabled',
    },function(err){
      console.log('err in storing the session cookie in mongodb',err);
    })
}));
//here we have initialize the passport and session which should be done before the app.set('view engine' : 'ejs') and also before the router middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);//<-- this middleware which is in passport-local-strategy.js , is used to take the user id and session details from cookie and then save the user details in lodals.user

// now first create a router in the routes folder and then exports the router
// and import the router here and tell the app that all the routes will be handle by this router
app.use('/',require('./routes/index'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views')

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

