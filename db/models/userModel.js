const userCollection = require("../schemas/userSchema");

const user ={
    async add(userDetailsObj){
        return await userCollection.create(userDetailsObj);
    },
    async search(userDetailsObj){
        return await userCollection.findOne({"emailID" : userDetailsObj.emailID});
    },
};

module.exports = user;