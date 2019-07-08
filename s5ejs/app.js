var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var sess = {
    secret: 'fraza secreta',
    cookie: {}
};
var methodOverride = require('method-override');

var admin = require("firebase-admin");
var serviceAccount = require("./ebus-tic-firebase-adminsdk-05oc73.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ebus-tic.firebaseio.com"
});
var db = admin.database();
var ref = db.ref("users");

var kvArray = [['spala', '1'], ['calca', '2'], ['spala vase', '3']];
var myMap = new Map(kvArray);

app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sess));
app.set("view engine", "ejs");
app.use(express.static("public/"));
app.use(methodOverride('_method'));

// basic middleware
var succes = function(req, res, next){
    if(req.session && req.session.email){
        return next();
    } else {
        req.session.error = "Te rugam sa te autentifici";
        res.redirect('/login');
    }
};

var faker = require("faker");

//ROUTES
app.get('/', function(req, res){
    res.send('You are in root');
});

app.get('/fake-data', function(req, res){
    var fake = faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}");
    res.render('fake', {fake: fake});
});

app.get("/fake-data/:noEntries", function(req, res) {
    var noEntries = req.params.noEntries;
    for(var i = 0; i < noEntries; i++){
        var randomFirstName = faker.fake("{{name.firstName}}");
        var randomLastName = faker.fake("{{name.lastName}}");
        var randomAge = 18 + Math.floor(Math.random() * 65);
        var randomJobTitle = faker.fake("{{name.jobTitle}}");
        var randomCountry = faker.fake("{{address.country}}");
        var randomCity = faker.fake("{{address.city}}");
        var randomStreetName = faker.fake("{{address.streetName}}");
        
        var newDatabaseEntry = ref.push({
           firstName: randomFirstName,
           lastName: randomLastName,
           age: randomAge,
           //jobTenure: 5,
           jobTitle: randomJobTitle,
           address: {
               country: randomCountry,
               city: randomCity,
               streetName: randomStreetName
           }
        });
        console.log(newDatabaseEntry);
    }
    res.send("Am populat baza de date cu " + noEntries + " inregistrari!");
});

app.get("/search/byCountry/:country", function(req, res) {
    var country = req.params.country;
    var dataSet = [];
    ref.orderByChild("address/country").equalTo(country).once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            dataSet.push(childData);
        });
        res.render("byCountry", {dataSet: dataSet});
    });    
});

app.get("/search/byAge/:startAge/:endAge", function(req, res) {
    var start = Number(req.params.startAge);
    var end = Number(req.params.endAge);
    ref.orderByChild("age").startAt(start).endAt(end).once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var key = childSnapshot.key;
            var childData = childSnapshot.val();
            console.log(childData);
        });
    });    
    res.send("Ai cautat dupa varsta intre " + start + " si " + end + " ani, verifica in consola!");
});

app.get('/users/set', function(req, res) {
    res.render('setUser', {echo_ejs: ""});
});

app.post("/users/set", function(req, res) {
    var key = req.body.userId;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var age = req.body.age;
    admin.database().ref("users/" + key).set({
        firstName: firstName,
        lastName: lastName,
        age: age
    });
    
    var string = "Ai actualizat intregistrarea cu ID-ul " + key + ". Daca acest ID nu exista, s-a creat o noua inregistrare.";
    res.render("setUser", {echo_ejs: string});
});
// app.get("/users/set/:userId", function(req, res) { //NU RESPECTA RESTFUL API - EDITEZ CU UN FORM SI FAC POST
//   var key = req.params.userId;
   
//   var firstName = "John";
//   var lastName = "Doe";
//   var age = 48;
   
//   admin.database().ref("users/" + key).set({
//       firstName: firstName,
//       lastName: lastName,
//       age: age
//   });
//   res.send("Ai actualizat inregistrarea cu ID-ul " + key + "!");
// });

app.get("/users/:userId", function(req, res) {
    var key = req.params.userId;
    ref.child(key).once('value').then(function(snapshot){
        var childData = snapshot.val();
        console.log(childData);
        //stergere dupa cheie unica
        ref.child(key).remove();
    });
    res.send("Ai cautat dupa ID-ul " + key + ", verifica in consola! Acesta a fost STERS!");
});

app.get('/todos', function(req, res){
    myMap = new Map(kvArray);
    var items = [];
    for (let [k, v] of myMap) {
        items.push(k + " - " + v);
    }
    res.render('list', {list_ejs : items});
});

app.get('/todos/new', function(req, res){
    res.render("new");
});

app.post('/todos', function(req, res){
    var item = [req.body.name, req.body.priority];
    kvArray.push(item);
    res.redirect('/todos');
});

app.get('/todos/:id', function(req, res){
    var nr = parseInt(req.params.id);
    var [k, v] = kvArray[nr];
    res.render("info", {id_ejs:nr, name_ejs:k, priority_ejs:v});
});

app.put('/todos/:id', succes, function(req, res){
    var nr = parseInt(req.params.id);
    kvArray[nr] = [req.body.name, req.body.priority];
    res.redirect('/todos/' + nr);
});

app.delete('/todos/:id', succes, function(req, res){
    kvArray.splice(req.params.id, 1);
    res.redirect('/todos');
});

app.get('/todos/:id/edit', succes, function(req, res){
    var nr = req.params.id;
    var [k, v] = kvArray[nr];
    res.render("edit", {id_ejs:nr, nume_ejs:k, prioritate_ejs:v});
});

app.get("/login", function(req, res){
    res.render("form");
});

app.post("/login", function(req, res){
   var userToLogin = req.body;
   if(userToLogin.email === "mihaigheorghe@gdm.ro" && userToLogin.password === "12345");{
       req.session.email = "mihaigheorghe@gdm.ro";
       res.redirect('/secret');
   }
});

app.get("/logout", function(req, res){
   req.session.destroy(function(error){
       if(error){
           res.redirect('/');
       } else {
           res.redirect('/');
       }
   })
});

app.get("/secret", succes, function(req, res){
    res.render("secret");
});

app.get('*', function(req, res) {
   res.send("404 NOT FOUND \nAi navigat pe o pagina care nu exista!");
});

app.listen(8080, function(){ //port 3000 pt local
 console.log('Server running...');
})