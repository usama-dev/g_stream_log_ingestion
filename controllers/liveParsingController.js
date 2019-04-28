const mongoose = require('mongoose');
const LiveLog = mongoose.model('LiveLog');
mongoose.set('useFindAndModify', false);	// To turn off findAndModify of Mongoose and use mongo native findOneAndUpdate


let catsOfChannels = {
	'ptvsportsweb': 'sports',
	'expressnewsweb': 'news',
	'samaaweb': 'news',
	'aljazeeraweb': 'news',
	'dawnnewsweb': 'news',
	'arymusic': 'entertainment',
	'8xmweb': 'entertainment',
	'publicnewsweb': 'news',
	'aplusweb': 'entertainment',
	'makkahweb': 'islamic',
	'madinaweb': 'islamic',
	'aryqtv': 'islamic',
	'madnitvweb': 'islamic',
	'expressentweb': 'entertainment',
	'aajentweb': 'entertainment',
	'humsitarayweb': 'entertainment',
	'hummasalaweb': 'entertainment',
	'aajtvweb': 'news',
	'playtvweb': 'entertainment',
	'abbtakkweb': 'news',
	'newsoneweb': 'news',
	'capitaltvweb': 'news',
	'tvoneweb': 'entertainment',
	'apnatvweb': 'entertainment',
	'dbtvlive': 'news',
	'mashriqtv': 'news',
	'mashriqtv': 'news',
	'khybernewsweb': 'news',
	'khybertvweb': 'entertainment',
	'pashtutvweb': 'entertainment',
	'channelfiveweb': 'news',
}

exports.post = async (req, res) => {

    let {view_date, platform, channel} = req.body;
	let postBody = req.body;

	let conditions = { view_date, platform, channel };
	let update = { $inc: { 
		"chunks.144": postBody.chunks[144],
		"chunks.240": postBody.chunks[240],
		"chunks.360": postBody.chunks[360],
		"chunks.480": postBody.chunks[480],
		"chunks.720": postBody.chunks[720],
		"chunks.total": postBody.chunks.total,
		"view_counts": postBody.view_counts},
		"category": catsOfChannels[postBody.channel]
	};
	let options = { new: true, upsert: true, setDefaultsOnInsert: true }

	console.log(conditions);

	// FULL Query
	// let result = await LiveLog.findOneAndUpdate(
	// 	{ date: '2018-10-26', platform: 'embed', channel:'new'}, 
	// 	{ $inc: { "chunks.144":200, "chunks.240":200, "chunks.360":200, "chunks.480":200, "chunks.720":72, "chunks.total":200, "view_counts":500} }, 
	// 	{ new: true, upsert:true, setDefaultsOnInsert:true })

	// Mongo Shell Query:
	// db.livelogs.update( { channel: "test1" }, {$inc: {"chunks.total":100, "chunks.720":200, "view_counts":500} }, {upsert:true} )
	
	let result = await LiveLog.findOneAndUpdate(conditions, update, options)

	console.log(`Log Added: ${result._id}`);
    res.send("Posted!");
}

exports.get = async (req, res) => {

	const { channel, platform, startDate, endDate } = req.query;
	let query = {};
	console.log(req.query);

	if (channel) query.channel = channel;
	if (platform) query.platform = platform;	
	if (startDate) query.view_date = { $gte: startDate };
	if (endDate) query.view_date.$lte = endDate;
	
	console.log(query);

	let result = await LiveLog.find(
		// {date: {$gte: '2018-10-26', $lte: '2018-10-27'}, platform: 'web', channel: 'new'}
		// {date: {$gte: '2018-10-26', $lte: '2018-10-27'} }
		query
	);

	// Operation start:

	res.send(result);
}