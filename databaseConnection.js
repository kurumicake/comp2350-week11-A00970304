const MongoClient = require("mongodb").MongoClient;

const is_render = process.env.IS_RENDER === 'true';
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const localURI = "mongodb://127.0.0.1/?authSource=admin&retryWrites=true&w=majority"
console.log(`is_render: ${is_render}`);

// Choose the URI based on the value of is_render
const mongoURI = is_render ? localURI : renderURI;
// Use SSL if connecting to the Render URI
const sslOption = is_render;
const database = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: sslOption
});
console.log(`Connecting to MongoDB with URI: ${mongoURI}`);
module.exports = database;
