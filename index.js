const express = require('express');
global.base_dir = __dirname;
global.abs_path = function(path) {
    return base_dir + path;
}
global.include = function(file) {
    return require(abs_path('/' + file));
}

const database = include('databaseConnection');
const router = include('routes/router');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use('/', router);

async function startServer() {
    try {
        await database.connect();
        console.log("Successfully connected to MongoDB.");

        app.listen(port, () => {
            console.log(`Node application listening on port ${port}`);
        });
    } catch (ex) {
        console.error("Error connecting to MongoDB", ex);
        process.exit(1); // Stop the process if we can't connect to the database
    }
}

startServer();
