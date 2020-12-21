const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getAllBootcamps = async (req, res, next) => {
	// console.log(req.hello); //Prints World
	try {
		const data = await Bootcamp.find();
		res.status(200).json({
			success: true,
			count: data.length,
			data,
			msg: 'show all bootcamps',
			// hello: req.hello,
		});
		//? keys having undefined values are not passed in res.json or are automatically removed from response body or removed when json is parsed
	} catch (err) {
		console.log(`Error name: ${err.name}`);
		console.log(`Error message: ${err.message}`);
		res.status(400).json({
			success: false,
			data: null,
			error: err.name,
			msg: 'some error occured',
		});
	}
};

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
	// console.log(req.params.id);
	try {
		const data = await Bootcamp.findById(req.params.id);
		if (!data) {
			return res.status(400).json({
				success: false,
				error: 'inavlid id',
				data,
				// msg: `some error occured`,
			});
		}
		res.status(200).json({
			success: true,
			data,
			msg: `get bootcamp ${req.params.id}`,
		});
	} catch (err) {
		console.log(`Error name: ${err.name}`);
		console.log(`Error message: ${err.message}`);
		res.status(400).json({
			success: false,
			error: err.name,
			data: null,
			msg: `some error occured/ invalid id format`,
		});
	}
};

// @desc    POST all bootcamps
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
	// console.log(req.body);
	try {
		const data = await Bootcamp.create(req.body);
		res.status(201).json({
			success: true,
			data,
			msg: 'created new bootcamp',
		});
	} catch (err) {
		// handled error will not be displayed red
		// console.log('\x1b[31m%s\x1b[0m', `Error name: ${err.name}`);
		// console.log('\x1b[31m%s\x1b[0m', `Error message: ${err.message}`);
		console.log(`Error name: ${err.name}`);
		console.log(`Error message: ${err.message}`);
		res.status(400).json({
			success: false,
			error: err.name,
			msg: 'error occured',
		});
	}
	// later we create error handler (asynchandle) and remove try catch so we dont have to handle error using trycatch
};

// @desc    PUT all bootcamps
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
	try {
		const data = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
			useFindAndModify: false,
		});
		if (!data) {
			return res.status(400).json({
				success: false,
				data: null,
				msg: `Invalid id ${req.params.id}`,
				error: 'some error occured',
			});
		}
		res.status(200).json({
			success: true,
			data,
			msg: `Updated bootcamp ${req.params.id}`,
		});
	} catch (err) {
		console.log(`Error name: ${err.name}`);
		console.log(`Error message: ${err.message}`);
		res.status(400).json({
			success: false,
			data: null,
			error: 'invalid id format',
			msg: `bootcamp ${req.params.id} does not exist`,
		});
	}
};

// @desc    DELETE all bootcamps
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
	try {
		const data = await Bootcamp.findByIdAndDelete(req.params.id);
		// console.log(data);
		if (!data) {
			return res.status(400).json({
				success: false,
				data: null,
				msg: `Invalid id ${req.params.id}, bootcamp does not exist`,
				error: 'some error occured',
			});
		}
		res.status(200).json({
			success: true,
			data,
			msg: `Deleted bootcamp ${req.params.id}`,
		});
	} catch (err) {
		console.log(`Error name: ${err.name}`);
		console.log(`Error message: ${err.message}`);
		res.status(400).json({
			success: false,
			data: null,
			error: 'invalid id format',
			msg: `bootcamp ${req.params.id} does not exist`,
		});
	}
};

// Errors ********************************************************

// can do exports.function or can use module.exports= an object with all property functions

// ! const data = Bootcamp.findById(req.params.id);
/*
!TypeError
Error: Converting circular structure to JSON
    --> starting at object with constructor 'NativeTopology'
    |     property 's' -> object with constructor 'Object'
    |     property 'sessionPool' -> object with constructor 'ServerSessionPool'
	--- property 'topology' closes the circle
*/
// Solution=> I also ran into this issue. It was because I forgot to await for a promise.

// When id format does not match
// !Error name: CastError Error message: Cast to ObjectId failed for value "5fdf4ee28f64a1bb52820229999" at path "_id" for model "Bootcamp"

// when id format matches but id that id does not has any document then no error given by model.findbyid(), so to handle it see that are we getting a document object returned by id or not
// response on a invalid id (no error)
/*
{
    "success": true,
    "data": null,
    "msg": "get bootcamp 5fdf4ee28f64a1bb52820228"
}
 */

//! Error: Cannot set headers after they are sent to the client
// when headers are set after response is send

// !(node:50557) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#findandmodify

// const data = await findByIdAndDelete(req.params.id);
// !Error name: MongooseError Error message: `Model.findByIdAndDelete()` cannot run without a model as `this`. Make sure you are calling `MyModel.findByIdAndDelete()` where `MyModel` is a Mongoose model.
// Solution=> const data = await BootCamp.findByIdAndDelete(req.params.id);
