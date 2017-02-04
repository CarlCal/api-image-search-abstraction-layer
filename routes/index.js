
const express = require("express")

const indexAsset = __dirname + "/../public"

router = express.Router()

router
	.use(express.static(indexAsset))

module.exports = router