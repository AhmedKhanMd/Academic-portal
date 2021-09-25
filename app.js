const express = require("express"); 
const bodyParser = require("body-parser"); 
const ejs = require("ejs");

const mongoose=require("mongoose");
const session = require('express-session');
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
 
const findOrCreate=require('mongoose-findorcreate');
const app = express(); 

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static("public")); 

 
app.use(session({
    secret:"sravanWEBdevResearchPublication.",
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  mongoose.connect("mongodb://localhost:27017/studytodayDB",{useNewUrlParser:true,useUnifiedTopology: true});
   
   
  const userSchema= new mongoose.Schema({
      email:String,
      password:String
      
      
    });
    userSchema.plugin(passportLocalMongoose);
    
    userSchema.plugin(findOrCreate);
  const User=new mongoose.model("User",userSchema);
  passport.use(User.createStrategy());
  passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });

app.get("/", function(req, res){
    res.render("index");
}) 

app.post("/signup", function(req, res){ 
    User.register({username: req.body.Email}, req.body.Password, function(err, user){
        if(err){
            console.log(err);  
            res.redirect("/");
        } 
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/academics");
            }); 
        }
    });
});

app.post("/login", function(req, res){
    const newUser = new User({
        email: req.body.Email, 
        password: req.body.Password
    }); 

    req.login(newUser, function(err){
        if(err){
            console.log(err);  
            res.redirect("/");
        } 
        else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/home");
            }); 
        }
    })
});

app.get("/home",function(req, res){

    res.render("home"); 
}) 

app.get("/academics", function(req, res){

    res.render("academics");
}) 

app.get("/interviewprep", function(req, res){

    res.render("interviewprep"); 
}) 

app.get("/team", function(req, res){

    res.render("team");
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