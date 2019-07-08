var express = require("express")
var app = express()

app.get("/", function(req, res){
	res.send("direct in browser");
})

app.get("/cautare", function(req, res){
	res.send("direct in pagina de cautare");
})

app.get("/cautare/:numeProdus", function(req, res){
	console.log(req.params.numeProdus)
	res.send("ai cautat "+req.params.numeProdus);
})


app.get("*", function(req, res){
	res.send("yepyep chaos");
})

app.listen(8080, function(){
	console.log("server started")
})

