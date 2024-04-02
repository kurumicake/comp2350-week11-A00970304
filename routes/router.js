const router = require('express').Router();
const database = include('databaseConnection');
//const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');
const ObjectId = require('mongodb').ObjectId;

// const userModel = include('models/web_user');
// const petModel = include('models/pet');

const Joi = require("joi");
const schema = Joi.string().max(10).required();


const crypto = require('crypto');
const { v4: uuid } = require('uuid');

const passwordPepper = "SeCretPeppa4MySal+";

router.get('/', async (req, res) => {
    console.log("page hit");
    try {
        // Ensure 'database' is connected before this point.
        const userCollection = database.db('lab_example').collection('users');
        const users = await userCollection.find({}, {
            projection: {
                first_name: 1,
                last_name: 1,
                email: 1,
                _id: 1
            }
        }).toArray();
        
        // Since `find().toArray()` returns an empty array if no documents are found,
        // the condition can simply check if the array is empty
        if (users.length === 0) {
            console.log("No users found");
            res.render('error', { message: 'No users found in MongoDB' });
        } else {
            console.log(users);
            res.render('index', { allUsers: users });
        }
    } catch (ex) {
        console.error("Error connecting to MongoDB", ex);
        res.render('error', { message: 'Error connecting to MongoDB' });
    }
});

router.get('/pets', async (req, res) => {
	console.log("page hit");

	
	try {
		const petCollection = database.db('lab_example').collection(pets);
		const pets = await petCollection.find({ "_id": ObjectId("606e98ba4526b5d688a88c0f") })
		const validationResult = schema.validate(req.query.id);
		if (validationResult.error != null) {
			console.log(validationResult.error);
			throw validationResult.error;
		}
		console.log(pets);
		res.render('pets', { allPets: pets });
	}

	catch (ex) {
		res.render('error', { message: 'Error connecting to MongoDB' });
		console.log("Error connecting to MongoDB");
		console.log(ex);
	}
});



router.get('/showPets', async (req, res) => {
	console.log("page hit");
	try {
		let userId = req.query.id;
		const user = await userModel.findByPk(userId);
		if (user === null) {
			res.render('error', { message: 'Error connecting to MongoDB' });
			console.log("Error connecting to userModel");
		}
		else {
			let pets = await user.getPets();
			console.log(pets);
			let owner = await pets[0].getOwner();
			console.log(owner);

			res.render('pets', { allPets: pets });
		}
	}
	catch (ex) {
		res.render('error', { message: 'Error connecting to MongoDB' });
		console.log("Error connecting to MongoDB");
		console.log(ex);
	}
});

router.get('/deleteUser', async (req, res) => {
	try {
		console.log("delete user");

		let userId = req.query.id;
		if (userId) {
			console.log("userId: " + userId);
			// Convert string ID to a MongoDB ObjectId
			const objectId = new ObjectId(userId);
			// Delete the user with the given ObjectId
			const result = await database.db('cluster0').collection('users').deleteOne({ _id: objectId });
			console.log("deleteUser result: ", result);
		}
		res.redirect("/");
	}
	catch (ex) {
		console.log("Error connecting to MongoDB", ex);
		res.render('error', { message: 'Error connecting to MongoDB' });
	}
});

router.post('/addUser', async (req, res) => {
	try {
		console.log("form submit");

		// Create password salt and hash
		const password_salt = crypto.createHash('sha512').update(uuid()).digest('hex');
		const password_hash = crypto.createHash('sha512').update(req.body.password + passwordPepper + password_salt).digest('hex');

		// Create a new user object
		let newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password_salt: password_salt,
			password_hash: password_hash
		};

		// Insert the new user into the MongoDB collection
		const result = await database.db('yourDatabaseName').collection('users').insertOne(newUser);
		console.log("addUser result: ", result);
		res.redirect("/");
	}
	catch (ex) {
		console.log("Error connecting to MongoDB", ex);
		res.render('error', { message: 'Error connecting to MongoDB' });
	}
});

module.exports = router;
