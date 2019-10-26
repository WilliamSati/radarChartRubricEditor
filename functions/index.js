const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// create and deploy your first cloud functions
// https://firebase.google.com/docs/functions/write-firebase-functions
//steps to create a new project: npm init
//npm install express -save, npm install ejs -save, npm install body-parser -save

var express = require('express');
var app = express();


app.set('view engine', 'ejs'); //by default, when you set a view engine and request a view, it will look in the views folder
app.use('/assets', express.static('../public/assets'));
//middleware: whenever the request is made (i.e /assets),
//and it's middle wear, it will first execute this middle wear before proceeding
//to 'next'. the 'express.static('') links to the assets folder, so any further / will access files within the assets folder.
//app.use(//'request that triggers the middlewear', function(req, res, next){
//middlewear
//next(); //calls the next handler
//});

app.get('/', function (req, res) { //called whenever usser requests for the main webpage (williamsati.com),called a request handler
   //everything between these brackets is called "middle ware"
   res.render('mainPage'); //searches in views folder by default. Renders a ejs page
   //res.render('home', {//an object}) to pass an object to be used for graphics in the ejs page.
   //you can also use res.sendFile(//pathTo file) to send a pure html page
});
app.get('/help', function(req,res){
  res.render('help');
});
app.get('/:somethingElse', function (req, res) {
   res.render('mainPage');
});
exports.app = functions.https.onRequest(app);
