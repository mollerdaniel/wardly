// Basic config
let listen_port = 8080 // Port to listen to
let service_fqdn = 'localhost:8080' // set to whatever your external endpoint is, include port if not 80 or 443
let use_https = false // does the endpoint support https?

// Setup variables
const discord_client_id = process.env.CLIENT_ID || 'empty_client_id'
const discord_client_secret = process.env.CLIENT_SECRET || 'empty_client_secret'
const protocol = (use_https ? 'https' : 'http')
const full_fqdn = protocol + '://' + service_fqdn
const redirect = encodeURIComponent(full_fqdn + '/auth/discord/callback');

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

function isAdded(eventId, nickname) {
	//let eventId = eventId
	let numberOfOccurencesInList = db
		.get('events')
		.find({ id: eventId })
		.pick('playerList')
		.value()
	if (numberOfOccurencesInList.playerList.indexOf(nickname) > -1) {
		return true
	}
	else {
		return false
	}
}


function getEvent(eventId) {
	return db
		.get('events')
		.find({ id: eventId })
		.value()
}

function getPlayerList(eventId) {
	let playerList = db
		.get('events')
		.find({ id: eventId })
		.pick('playerList')
		.value()
	if (!playerList) {
		return [];
	}
	return playerList.playerList
}

// Write defaults to DB if empty
db.defaults({ events: [] })
	.write()

app.get('/auth/discord/login', (req, res) =>  {
	res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${discord_client_id}&scope=identify&response_type=code&redirect_uri=${redirect}`);
});

// GET /event
app.get('/event', function (req, res) {
	const data = { events: getEvents() }
	res.send(def_response(null, data))
});

app.get('/event/:eventId/details', function (req, res) {
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
	let playerList = getPlayerList(eventId)
	res.send(def_response(null, {
		events: [event],
		playerList: getPlayerList(eventId),
	}))
});

// TODO WIP
app.post('/event/:eventId/signup', function (req, res) {
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

app.post('/event', function (req, res) {
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
	let newPlayerList = []
	let newEventId = shortid.generate()
	let event = {
		id: newEventId,
		name: req.body.name,
		guildid: req.body.guildid,
		date_start: req.body.date_start,
		date_end: req.body.date_end,
		playerList: newPlayerList,
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
	res.send(def_response(null, { events: [eventFromDB] }))
});

app.post('/event/:eventId/removeEvent', function (req, res) {
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

	db
		.get('events')
		.remove({ id: eventId })
		.write()

	console.log('removed event')
	console.log(event)
	var name = req.body.name;
	let eventFromDB = getEvent(eventId);
	res.send(def_response(null, 'Event ' + eventId + 'was successfully removed'))
});


app.post('/event/:eventId/updateTime', function (req, res) {
	let eventId = req.params.eventId;
	var startDate = req.body.date_start;
	var endDate = req.body.date_end;

	if (!eventId) {
		res.send(def_response('missing id'))
		return;
	}
	let event = getEvent(eventId);
	if (!event) {
		res.send(def_response('id was sent, but what is?!'))
		return
	}

	if (!startDate && !endDate) {
		res.send(def_response('date_start or end_date is mandatory'))
		return;
	}
	if (startDate) {
		db
			.get('events')
			.find({ id: eventId })
			.assign({ date_start: startDate })
			.write()
			.id

		console.log('updated ' + eventId + 'date_start to:' + endDate)
	}
	if (endDate) {
		db
			.get('events')
			.find({ id: eventId })
			.assign({ date_end: endDate })
			.write()
			.id

		console.log('updated ' + eventId + 'date_end to:' + endDate)
	}

	let eventFromDB = getEvent(eventId);
	if (!eventFromDB) {
		res.send(def_response('data was accepted, but an error happened when we tried to store it. Many brokend backend :('))
		return
	}
	res.send(def_response(null, { events: [eventFromDB] }))
});



app.post('/event/:eventId/add', function (req, res) {
	let eventId = req.params.eventId
	let nickname = req.body.nickName
	if (!eventId) {
		res.send(def_response('missing id'))
		return
	}
	if (!nickname) {
		res.send(def_response('missing nickname'))
		return
	}
	let event = getEvent(eventId);
	if (!event) {
		res.send(def_response('id was sent, but what is?!'))
		return
	}

	if (isAdded(eventId, nickname)) {
		res.send(def_response('Player is already in list!'))
		return
	}
	//WE DO NOT TRUST FRONTEND.

	let playerList = getPlayerList(eventId)
	playerList.push(nickname)
	db
		.get('events')
		.find({ id: eventId })
		.assign({ playerList })
		.write()
		.id

	console.log('Updated playerlist:')
	console.log(playerList)
	let eventFromDB = getEvent(eventId);
	if (!eventFromDB) {
		res.send(def_response('data was accepted, but an error happened when we tried to store it. Many brokend backend :('))
		return
	}
	res.send(def_response(null, { events: [eventFromDB] }))
});