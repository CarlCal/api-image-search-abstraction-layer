
const MongoClient = require("mongodb").MongoClient

const mLab = "mongodb://carlcal-fcc:carlcal-fcc-secret@ds031328.mlab.com:31328/url-shortener"

//process.env.MONGOLAB_URI

MongoClient.connect(mLab, (err, connection) => {
	if (err) throw err
	
	connection.createCollection("images", {capped: true, size: 4096, max: 10})

	module.exports.db = connection
})