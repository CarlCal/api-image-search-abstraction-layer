
const express = require("express")

router = express.Router()

router
	.get("/", (req, res) => {
		res.send("latest/imagesearch")
	})

module.exports = router