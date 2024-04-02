const MongoClient = require("mongodb").MongoClient;
const is_render = process.env.IS_RENDER || false;
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const localURI = "mongodb://127.0.0.1/?authSource=admin&retryWrites=true&w=majority"
if (is_render) {
var database = new MongoClient(renderURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
else {
var database = new MongoClient(localURI, {useNewUrlParser: true, useUnifiedTopology: true});
}
module.exports = database;