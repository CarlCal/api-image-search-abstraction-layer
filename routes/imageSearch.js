
const bodyParser =require("body-parser")
const express = require("express")
const wreck = require('wreck')

const baseURL = "https://www.googleapis.com/customsearch/v1?"
const key = "key=AIzaSyBXZa1FK9G0f4PAgcw01BkTjCzUseE8gko&" //process.env.KEY
const id = "cx=003782819325232296874:b-cwzuxa1is&" //process.env.ID
const options = "&searchType=image&linkSite&"

router = express.Router()

router
	.use(bodyParser.json())
	.get("/", (req, res) => {
		res.send("add search terms as a parameters with %25 as seperators")
	})
	.get("/:search", (req, res) => {
		var offset = parseInt(req.query["offset"], 10)
		var start = "start=" + ((offset < 2) ? 1 : ((offset - 1) * 10) + 1)
		var searchTerms = "q="+req.params["search"].split("%").join("+")+"&"
		
		var url = baseURL+key+id+searchTerms+options+start

		wreck.request("GET", url, true, (err, body) => {
			wreck.read(body, {'json': true}, (err, result) => {
				res.send(result)
			})
		})
	})
	
module.exports = router

//item
	//link 											"url"
	//snippet										"snippet"
	//image, thumbnailLink			"thumbnail"
	//image, contextLink				"context"

//latest search
	//quesries, request, search terms "term"
	//current date full date and time	"when"