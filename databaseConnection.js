const MongoClient = require("mongodb").MongoClient;

// Check if the application is running on Render.
// We expect IS_RENDER to be set to 'true' as a string when running on Render.
const is_render = process.env.IS_RENDER === 'true';

// MongoDB connection URIs.
const renderURI = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const localURI = "mongodb://127.0.0.1/?authSource=admin&retryWrites=true&w=majority";

// Log the current environment for debugging purposes.
console.log(`is_render: ${is_render}`);

// Choose the correct URI based on whether the app is running on Render or locally.
// If is_render is true, use the renderURI. Otherwise, use the localURI.
const mongoURI = is_render ? renderURI : localURI;

// Initialize the MongoClient with the selected URI.
// Since MongoClient's useNewUrlParser and useUnifiedTopology options are default and deprecated in version 4.0 and above, you only need to specify ssl if required.
const database = new MongoClient(mongoURI, {
    ssl: is_render // Use SSL when connecting to MongoDB Atlas (renderURI), as required.
});

// Log the MongoDB URI being used to connect, for debugging.
console.log(`Connecting to MongoDB with URI: ${mongoURI}`);

module.exports = database;
