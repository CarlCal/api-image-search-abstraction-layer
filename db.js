
const MongoClient = require("mongodb").MongoClient

MongoClient.connect(process.env.MONGOLAB_URI, (err, connection) => {
	if (err) throw err
	
	connection.createCollection("images", {capped: true, size: 4096, max: 10})

	module.exports.db = connection
})