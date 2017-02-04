
const express = require("express")

var mongo = require("../db")

var router = express.Router()

router
	.get("/", (req, res) => {
		mongo.db.collection("images")
			.find()
			.toArray((err, searches) => {
				res.send(searches)
			})
	})

module.exports = router
