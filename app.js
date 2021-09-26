const express = require("express"); 
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const firebase = require("firebase");
const { get } = require("express/lib/response");

const app = express(); 

app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static("public")); 

const firebaseConfig = {
    apiKey: "AIzaSyApBWwJHhpvdhHITOHOuy42x_fgxhlrU1Y",
    authDomain: "studytoday-608a2.firebaseapp.com",
    projectId: "studytoday-608a2",
    storageBucket: "studytoday-608a2.appspot.com",
    messagingSenderId: "169026371704",
    appId: "1:169026371704:web:f96fc2d3f6a8a78e40ed8d"
  };

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp; 
const auth = firebase.auth(); 

app.get("/", function(req, res){
    res.render("index",{message:""});
}) 

app.post("/signup", function(req, res){ 
    const email = req.body.Email; 
    const password = req.body.Password; 
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        console.log("user created"); 
        res.render("index",{message:"User created, please login"});
    }).catch(error=>{
        console.log(error.code); 
        res.render("index",{message:"User Not created"});
    });
});

app.post("/login", function(req, res){
    const email = req.body.Email; 
    const password = req.body.Password; 
    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        console.log("user loged in"); 
        res.redirect("/home");
    }).catch(error=>{ 
        console.log(error.code); 
        res.render("index",{message:"INVALID CREDENTIALS"});
    });
});

app.get("/home",function(req, res){
    if(auth.currentUser !== null){
        res.render("home");
    }
    else{
        res.render("index",{message:"session expired"});
    }
}) 

app.get("/academics", function(req, res){
    if(auth.currentUser !== null){
        res.render("academics");
    }
    else{
        res.render("index",{message:"session expired"});
    }
    
}) 

app.get("/interviewprep", function(req, res){
    if(auth.currentUser !== null){
        res.render("interviewprep");
    }
    else{
        res.render("index",{message:"session expired"});
    }
     
}) 

app.get("/team", function(req, res){
    if(auth.currentUser !== null){
        res.render("team");
    }
    else{
        res.render("index",{message:"session expired"});
    }
}) 

app.get("/support", function(req, res){
    res.render()
})


app.post("/logout", function(req, res){
    if(auth.currentUser !== null){
        auth.signOut().then(()=>{
            console.log("user signed out"); 
            res.redirect("/");
        }).catch(error=>{
            console.log(error); 
            res.redirect("/");
        });
    }
    else{
        res.render("index",{message:"session expired"});
    }
})



app.listen(3000, function(){
    console.log("server started on port 3000");
});