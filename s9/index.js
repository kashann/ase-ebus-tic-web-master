var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var cors = require ("cors");

// app.use(cors());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var admin = require("firebase-admin");
var serviceAccount = require("../s9/firebase_auth/ebu-firebase-7.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ebus-tic.firebaseio.com"
});
var db = admin.database();
var users = db.ref("users");
var auth = db.ref("auth");

app.get('/', function(req, res){
    res.send('ai ajuns in root');
});

app.get('/login', function(req, res){
    res.render("login");
});

app.post('/login', function(req, res){
   var data = req.body;
   console.log(data.email + " / " + data.password);
   var exista = false;
   users.orderByChild("email").equalTo(data.email).once('value').then(function(snapshot){ //presupunem ca emailurile sunt unice
       snapshot.forEach(function(childSnapshot){
           var childData = childSnapshot.val();
           if(childData.password === data.password){
               var expires = new Date();
               expires.setHours(expires.getHours() + 1);
               expires = expires.getTime();
               var newAuth = auth.push({
                   email: data.email,
                   expires: expires
               });
               console.log(newAuth.key);
               exista = true;
               res.redirect('/autorizat/' + newAuth.key); //AICI POT SA FAC TOT CE VREAU PUT POST DELETE ETC
           } else {
               res.send("Parola NU corespunde!");
           }
       });
       if(!exista){
           res.send("Emailul NU a fost gasit!");
       }
   });
});

app.get('/autorizat/:token', function(req, res) {
   var key = req.params.token;
   console.log("KEY:   " + key);
   auth.child(key).once('value').then(function(snapshot){
       var childData = snapshot.val();
       if (childData){
           var now = new Date();
           if(now.getTime() < childData.expires){
               res.send('Esti autorizat sa accesezi resursa pt autentificare cu cheia ' + key + ' si emailul ' + childData.email);
           } else {
               res.send('autentificarea a expirat');
           }
       } else {
           res.send('este necesara autentificarea');
       }
   });
});

app.get('*', function(req, res){
    res.send('ce vrei mamaie?');
});

app.listen(8080, function(){
	console.log("server started");
});