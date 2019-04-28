const mongoose = require('mongoose');
const VodLog = mongoose.model('VodLog');
const config = require('../config')
const axios = require('axios');
mongoose.set('useFindAndModify', false);	// To turn off findAndModify of Mongoose and use mongo native findOneAndUpdate


let parsedQueue = [];	// Global: A queue for storing all the parsed logs in memory


setInterval(() => { 	// Rate limiting of API calls 
	if (parsedQueue.length !== 0) {
		console.log('Queue items left: ', parsedQueue.length);
		let search = parsedQueue.shift();
		// console.log(search);

		// Getting video details by file_name
		axios.get(`${config.apiGateway}/video?file_name=${search.file_name}.m4v`)
		.then( resp => {
			// console.log(resp.data[0]);

			// Check if the result is not found then return
			if (resp.data[0] == undefined) {
				console.log(`Video tuple not found for file: ${search.file_name}`);
				return;
			}
			
			// Extracting the required fields from video document
			let { _id, title, program, source, duration, category, sub_category, anchor, guests, topics, publish_dtm } =  resp.data[0];

			vod_details = { _id, title, program, source, duration, category, sub_category, anchor, guests, topics, publish_dtm }

			// Preparing Complete docs with required fields
			let conditions = { view_date: search.view_date, platform: search.platform, file_name: search.file_name };	// Every day there should be unique entry for one video(file_name) for each platform
			let update = { $inc: { 
				"chunks.auto": search.chunks['auto'],
				"chunks.144": search.chunks[144],
				"chunks.240": search.chunks[240],
				"chunks.360": search.chunks[360],
				"chunks.480": search.chunks[480],
				"chunks.720": search.chunks[720],
				"chunks.total": search.chunks.total,
				"view_counts":search.view_counts},
				vod_details
			};
			let options = { new: true, upsert:true, setDefaultsOnInsert:true }		// Adding new doc if not exist

			// Mongoose Query to findOneAndUpdate with upsert true
			VodLog.findOneAndUpdate(conditions, update, options)
				.then(res => console.log('Log added for: ', res.file_name));
		})
		.catch(err => console.log(err));
	}
	else {
		// console.log('nothing in queue');
	}
}, 200)		// Runs after specified time in ms

exports.post = async (req, res) => {

	let postBody = req.body;

	// Pushing the parsed log in queue
	parsedQueue.push(postBody);
    res.send("Added to Queue!");
}

exports.get = async (req, res) => {

	const { platform, file_name, startDate, endDate } = req.query;
	let query = {};
	console.log(req.query);

	if (file_name) query.file_name = file_name;
	if (platform) query.platform = platform;
	if (startDate) query.view_date = { $gte: startDate };
	if (endDate) query.view_date.$lte = endDate;
	
	console.log(query);

	let result = await VodLog.find(
		// {date: {$gte: '2018-10-26', $lte: '2018-10-27'}, platform: 'web', channel: 'new'}
		// {date: {$gte: '2018-10-26', $lte: '2018-10-27'} }
		query
	);

	res.send(result);
}