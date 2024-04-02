const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = "mongodb+srv://theMongoAdmin:accidentalLoginSteps@cluster0.t1y1wqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbConfigLocal = "mysql://root:Password@localhost/lab_example";

if (is_heroku) {
	var databaseConnectionString = dbConfigHeroku;
}
else {
	var databaseConnectionString = dbConfigLocal;
}

module.exports = databaseConnectionString;
		