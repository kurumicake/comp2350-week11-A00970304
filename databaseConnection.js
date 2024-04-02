const MongoClient = require("mongodb").MongoClient;

// Correctly determine if the application is running on Render
const is_render = process.env.IS_RENDER === 'true';

// Ensure the correct URI is selected based on the environment
const mongoURI = is_render ? localURI : renderURI;

// Logging for debugging
console.log(`is_render: ${is_render}`);
console.log(`Connecting to MongoDB with URI: ${mongoURI}`);

// Initialize the MongoClient with the appropriate URI and SSL option
const database = new MongoClient(mongoURI, {
    ssl: is_render // Assuming you need SSL only when connecting to the cloud database
});

module.exports = database;
