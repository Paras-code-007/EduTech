const mongoose = require('mongoose');

async function ConnectDb() {
	try {
		const Connection = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true, //?
			useFindAndModify: false, //?
		});
		// console.log(Connection); //contains all info regarding connection even usernmae and pass
		console.log('\x1b[36m%s\x1b[0m', `connected to db ${Connection.connection.host}:${Connection.connection.port}`);

		Connection.connection.on('error', console.error.bind(console, 'connection error:'));
	} catch (err) {
		console.log('Error Connecting to the Database');
		console.log(`${err.name} :${err.message}`);
		process.exit(1); //creash when db not connected
	}
}

// test
// ConnectDb();

module.exports = ConnectDb;

/*
!(node:41636) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
!(node:41636) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
!(node:79531) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify
*/
