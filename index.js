const express = require('express')
const bp = require('body-parser')
const cors = require('cors')
const path = require('path')
const pug = require('pug')
const apiKey = 'fcPUZovsuNb-UxcKPGK2BKpz-OtdwtYuBvEYHl656ipSYF2dE52_K4w8mS9hLSWZh00PFFVotNIxgMKpzBbYZCaAvETLJbS4XIN6b3yQJTh68dT2_B0Gj0lNagacW3Yx'
const PORT = process.env.PORT || 5000
const RapidAPI = require('rapidapi-connect');
const rapid = new RapidAPI('default-application_5ba0143de4b02d6cfa6a3694', '02304d8e-1224-4cec-8283-9d931ed0a20c');
let eventList = ''

express()
	.use(express.static(path.join(__dirname, 'public')))
	.use(bp.json())
	.use(bp.urlencoded({extended: true}))
	.set('views', 'public/views')
	.set('view engine', 'pug')

	.get('/', loadPage)
	.post('/', compileData)
	.get('/api/', loadEvents)

	.listen(PORT, () => console.log(`Listening on ${ PORT }`))

function loadPage(req, res) {
	res.render('index')
}

function loadEvents(req, res) {
	console.log("Load events.pug called")
	console.log(eventList)
	res.render(path.join(__dirname, 'public/views/api/index.pug'), {'data': eventList})
	//res.send({'data': eventList})
}

function compileData(req, res) {
	let loc = req.body.data[0] + ', ' + req.body.data[1]
	console.log(req.body.data)
	rapid.call('YelpAPI', 'searchEvent', {
		'accessToken': apiKey,
		'coordinates': loc, // User location in lat/long
		'startDate': req.body.data[2], // This should be today
		'endDate': req.body.data[3], // This should just before midnight tomorrow
		'limit': '25',
		'radius': '1200',
		'sortOn': 'time_start'
	}).on('success', (data) => {
		let results = "Events: " + data.events[0].name + ", " + data.events[1].name + ", ..."
		console.log(results)
		eventList = data.events
		//res.redirect('/api/')
		//res.render(path.join(__dirname, 'public/views/api/index.pug'), {'data': eventList})
		//res.redirect(200, '/api/events.pug')
	}).on('error', (data)=>{
		console.log(data);
	})
}
