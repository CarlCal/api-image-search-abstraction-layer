
const express = require("express")
const moment = require("moment")
const wreck = require('wreck')

const baseURL = "https://www.googleapis.com/customsearch/v1?"
const key = "key="+process.env.KEY+"&"
const id = "cx="+process.env.ID+"&"
const options = "&searchType=image&linkSite&"

var mongo = require("../db")

var router = express.Router()

router
	.get("/", (req, res) => {
		res.send("add search terms as a parameters with %25 as seperator")
	})
	.get("/:search", (req, res) => {
		var offset = parseInt(req.query["offset"], 10)
		var start = "start=" + ((offset < 2) ? 1 : ((offset - 1) * 10) + 1)
		var searchTerms = "q=" + req.params["search"].split("%").join("+") + "&"
		
		var url = baseURL+key+id+searchTerms+options+start

		wreck.request("GET", url, true, (err, body) => {
			wreck.read(body, {'json': true}, (err, result) => {
				if(err) throw err

				var final = []
				var time = {
					term: result["queries"]["request"][0]["searchTerms"],
					when: moment().toISOString()			
				}

				mongo.db.collection("images")
					.insert(time, (err, done) => {
						if(err) throw err

						if(!done) {
							res.send("Could't log the search")
						}
					})

				for (var i = 0; i < result["items"].length; i++) {
					var image = {
						url: result["items"][i]["link"],
						snippet: result["items"][i]["snippet"],
						thumbnail: result["items"][i]["image"]["thumbnailLink"],
						context: result["items"][i]["image"]["contextLink"]
					}; final.push(image)

					if (i === result["items"].length - 1) {
						res.send(final)
					}
				}
			})
		})
	})
	
module.exports = router
