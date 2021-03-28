const jwt = require("jsonwebtoken");

const jwtOperations = {
    SECRETKEY : "BYTEBRACKETS",
    generateToken(emailID){
        var token = jwt.sign({"emailId":emailID},this.SECRETKEY,{expiresIn:"1h"});
        return token;
    },
    verifyToken(token){
        var decoded = jwt.verify(token,this.SECRETKEY);
        if(decoded){
            return true;
        }
        else{
            return false;
        }
    }
};

module.exports = jwtOperations;