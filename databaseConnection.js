const MongoClient = require("mongodb").MongoClient;
const is_render = process.env.IS_RENDER === true;
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const localURI = "mongodb://127.0.0.1/?authSource=admin&retryWrites=true&w=majority"
console.log(`is_render: ${is_render}`);
console.log(`Connecting to MongoDB with URI: ${mongoURI}`);
const mongoURI = is_render ? renderURI : localURI;
const database = new MongoClient(mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    ssl: is_render 
});
module.exports = database;