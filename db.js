
const MongoClient = require("mongodb").MongoClient

const mLab = "mongodb://carlcal-fcc:carlcal-fcc-secret@ds031328.mlab.com:31328/url-shortener"
const local = "mongodb://localhost:27017/shorter-url"

//process.env.MONGOLAB_URI

MongoClient.connect(mLab, (err, connection) => {
	if (err) throw err
		
	module.exports.db = connection
})