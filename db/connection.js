const mongoose = require("mongoose");
// const url="mongodb://localhost:27017/nodeAPITesting";
const url =  "mongodb+srv://amaDB:ama_12345@amadb.172w7.mongodb.net/userDetails?retryWrites=true&w=majority";

mongoose.set("useNewUrlParser",true);
mongoose.set("useCreateIndex",true);
mongoose.set("useUnifiedTopology",true);
mongoose.set("useFindAndModify",false);
mongoose.connect(url);

module.exports = mongoose;