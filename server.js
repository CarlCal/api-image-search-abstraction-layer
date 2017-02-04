
const bodyParser =require("body-parser")
const express = require("express")

const app = express()

const index = require("./routes/index")
const api = require("./routes/api")

var port = process.env.PORT || 3000

app
	.use(bodyParser.json())
	.use("/", index)
	.use("/api", api)
	.get("*", (req, res) => {
		res.redirect("/")
	})
	.listen(port)