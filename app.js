const express = require("express");
const app = express();
const port = 1234;
const userModel = require("./db/models/userModel");
const cors = require('cors');
const jwtObject = require('./utils/JWT');
const bcrypt = require('bcrypt');

// Communicate Between 2 Servers
app.use(cors());

// Data Coming in Body or URL.
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Serve Static File
app.use(express.static("public"));

// Middleware
app.use((req,res,next)=>{
    var url = req.url;
    var method = req.method;
    
    console.log("Request URL is "+url);
    console.log("Method is "+method);
    next();
});

// doLogin 
// {"emailID" : ""yateshChhabra@gmail.com"","password" : "12345"}
app.post("/doLogin",(req,res)=>{
    
    var userDetailsObj = req.body;
    console.log("For Login Details are",userDetailsObj); 
    userModel.search(userDetailsObj).then((data)=>{
        if(data == null){
            res.json({"status" : 404});
        }
        else{
           
            let bool = bcrypt.compareSync(userDetailsObj.password,data.password); 
            if(bool == true){
                let token = jwtObject.generateToken(userDetailsObj.emailID);
                
                res.json({
                    "status" : "200",
                    "token" : token,
                    "emailID" : userDetailsObj.emailID,});
            }
           
        }

    }).catch((err)=>{
        res.json({status: 503});
    });
    
});

//doSignup
// {"fname" : "Yatesh", "lname" : "Chhabra", "emaildID" : "yateshChhabra@gmail.com", "password" : "12345"} 
app.post("/doSignup",(req,res)=>{
    var userDetailsObj = req.body;
    console.log("For Signup Details are",userDetailsObj);
    let salt = bcrypt.genSaltSync(3);
    let hash = bcrypt.hashSync(userDetailsObj.password,salt);

    userDetailsObj.password = hash;
    userModel.add(userDetailsObj).then((data)=>{
        res.json({"status": 200});
    }).catch((err)=>{
        res.json({"status": 404});
    });
});

//dashboard
app.post("/dashboard",(req,res)=>{
    var userToken = req.body;
    if(jwtObject.verifyToken(userToken.token)){
        res.json({status : 200});
    }
    else{
        res.json({status : 404});
    }
})

// Server
app.listen(process.env.PORT || port,(req,res)=>{
    console.log("Backend Server Started on port",port);
})