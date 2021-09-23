const express = require("express"); 
const bodyParser = require("body-parser"); 
const ejs = require("ejs");

const app = express(); 

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static("public")); 

app.get("/", function(req, res){
    res.render("index");
}) 

app.post("/signup", function(req, res){

    res.render("home");
})

app.post("/login",function(req, res){

    res.render("home"); 
}) 

app.get("/home",function(req, res){

    res.render("home"); 
}) 

app.get("/academics", function(req, res){

    res.render("academics");
}) 

app.get("/interviewprep", function(req, res){

    res.render("interviewprep"); 
}) 

app.get("/support", function(req, res){
    res.render()
})


app.post("/logout", function(req, res){

    res.render("index");
})



app.listen(3000, function(){
    console.log("server started on port 3000");
});