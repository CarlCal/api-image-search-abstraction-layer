
const express = require("express")

const imageSearch = require("./imageSearch")
const latestImageSearch = require("./latestImageSearch")

router = express.Router()

router
	.get("/", (req, res) => {
		res.send("Look for images with /imagesearch OR look at latest searches with /latest/imagesearch")
	})
	.use("/imagesearch/", imageSearch)
	.use("/latest/imagesearch/", latestImageSearch)

module.exports = router