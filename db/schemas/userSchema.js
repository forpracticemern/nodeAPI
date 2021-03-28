const mongoose = require("../connection");
const Schema =  mongoose.Schema;

const userSchema = new Schema({
    fname: {type: String, required : true,},
    lname: {type: String, required : true,},
    emailID : {type: String, required : true, unique : true},
    password: {type: String, required : true,},
});

const userCollection = mongoose.model("users",userSchema);

module.exports = userCollection;