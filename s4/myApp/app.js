var express = require("express");
var app = express();

app.use(express.static('public'));

app.set("view engine", "ejs");


app.get("/:variabila", function(req, res){
	var x = req.params.variabila;
	res.render('home', {variabila_ejs : x});
});


app.get("*", function(req, res){
	res.send("yepyep chaos");
});

app.listen(8080, function(){
	console.log("server started");
});