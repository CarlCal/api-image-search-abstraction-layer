
const express = require("express")

var mongo = require("../db")

var router = express.Router()

router
	.get("/", (req, res) => {
		mongo.db.collection("images")
			.find()
			.toArray((err, searches) => {
				if (err) throw err

				for (var i = 0; i < 10; i++) {
					delete searches[i]["_id"]
					
					if (i === (10 - 1)) {
						res.send(searches.reverse())
					}
				}
			})
	})

module.exports = router
