let listen_port = 8080
// HTTP SERVER
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const shortid = require('shortid')

// START HTTP SERVER
app.listen(listen_port, () => console.log('Server running on http://localhost:' + listen_port))


function def_response(error, data) {
	let retData = data || {}
	let retError = error || {}
	let errorCode = 0;
	if (error) {
		errorCode = 1;
	}
	response = {}
	response.error = retError
	response.data = retData
	response.errorCode = errorCode
	return response
}

function getEvents() {
	return db.get('events')
	.value()
}

function getEvent(eventId) {
	return db
	.get('events')
	.find({ id: eventId })
	.value()
}

function getPlayerList(eventId) {
	let playerList = db
	.get('playerlist')
	.find({ eventId: eventId })
	.value()
	if (!playerList) {
		return [];
	}
	return playerList
}

// Write defaults to DB if empty
db.defaults({ events: []})
  .write()

// GET /event
app.get('/event', function(req, res) {
	const data = {events: getEvents()}
	res.send(def_response(null, data))
});

app.get('/event/:eventId/details', function(req, res) {
	let eventId = req.params.eventId
	if (!eventId) {
		res.send(def_response('missing id'))
		return;
	}
	let event = getEvent(eventId);
	if (!event) {
		res.send(def_response('id was sent, but what is?!'))
		return
	}
	let playerlist = getPlayerList(eventId)
	res.send(def_response(null, {
		events: [event],
		playerlist: getPlayerList(eventId),
	}))
});

// TODO WIP
app.post('/event/:eventId/signup', function(req, res) {
	// this should be fetched from a session or credentials somehow
	//let tempvarname = req.query.name

	let eventId = req.params.eventId
	if (!eventId) {
		res.send(def_response('missing id'))
		return;
	}
	let event = getEvent(eventId);
	if (!event) {
		res.send(def_response('id was sent, but what is?!'))
		return
	}


});

app.post('/event', function(req, res) {
	if (!req.body.name) {
		res.send(def_response('missing name'))
		return;
	}
	if (!req.body.guildid) {
		res.send(def_response('missing guildid'))
		return;
	}
	if (!req.body.date_start) {
		res.send(def_response('missing date_start'))
		return; 
	}
	if (!req.body.date_end) {
		res.send(def_response('missing date_end'))
		return;
	}
	let newEventId = shortid.generate()
	let event = {
		id: newEventId,
		name: req.body.name,
		guildid: req.body.guildid,
		date_start: req.body.date_start,
		date_end: req.body.date_end
	}
	db
	.get('events')
	.push(event)
	.write()
	.id

	console.log('saving event to id:')
	console.log(newEventId)
    var name = req.body.name;
    let eventFromDB = getEvent(newEventId);
    if (!eventFromDB) {
    	res.send(def_response('data was accepted, but an error happened when we tried to store it. Many brokend backend :('))
    	return
    }
    res.send(def_response(null, {events: [eventFromDB]}))
});
