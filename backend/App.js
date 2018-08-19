// Basic config
let listen_port = 8080 // Port to listen to
let service_fqdn = 'localhost:8080' // set to whatever your external endpoint is, include port if not 80 or 443
let use_https = false // does the endpoint support https?

// END of config


// Setup variables
const discord_client_id = process.env.CLIENT_ID || 'empty_client_id'
const discord_client_secret = process.env.CLIENT_SECRET || 'empty_client_secret'
const discord_api_base = 'https://discordapp.com/api'
const protocol = (use_https ? 'https' : 'http')
const full_fqdn = protocol + '://' + service_fqdn
const redirect_url = full_fqdn + '/auth/discord/callback';
const redirect_url_enc = encodeURIComponent(redirect_url);

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
const http = require('http')
const fetch = require('node-fetch');
const { catchAsync } = require('./utils');
const querystring = require('querystring');

// START HTTP SERVER
app.listen(listen_port, () => console.log('Server running on http://localhost:' + listen_port))

async function discord_get_token_from_callback(code, scope) {
    // 'code' is the data we get from the client code in the callback url
    var post_data = {
        client_id: discord_client_id,
        client_secret: discord_client_secret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_url,
        scope: encodeURIComponent(scope)
    };
    return await http_post_discord('/oauth2/token', post_data)
}

async function http_get_discord(apiEndpoint, token) {
    let url = discord_api_base + apiEndpoint
    return await http_get(url, token)
}

async function http_post_discord(apiEndpoint, postData) {
    let url = discord_api_base + apiEndpoint
    return await http_post(postData, url);
}

async function http_post(postData, url) {
    let postObject = {
        method: 'POST',
        body: querystring.stringify(postData),
        headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Content-Length': postData.length
        },
    }
    const response = await fetch(url, postObject);
    const json = await response.json();
    return json
}

async function http_get(url, token) {
    let getObject = {
        method: 'GET',
        headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + token,
        },
    }
    const response = await fetch(url, getObject);
    const json = await response.json();
    return json
}

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

function removePlayer(nickname,eventId){

    let oldPlayerList = getPlayerList(eventId)
    let playerList = oldPlayerList.filter(playerName => playerName !== nickname )
    console.log(playerList)
    console.log('playerlist')
    db
        .get('events')
        .find({ id: eventId })
        .assign({ playerList })
        .write()
        .id

    console.log('Updated playerlist:')
    console.log(playerList)
    
    return
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

function checkId(shortidValue) {
    return shortid.Value(shortidValue)
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

function loginUser(sessionData) {
    // Create new empty session
    let session = createSession()
    if (!shortid.isValid(session.id)) {
        return {}
    }

    // save it in db
    updateSession(session.id, sessionData)


    // we DONT return all the discord data to the user, it's sensitive.. but we store it in the session
    // we do return session_id for the app to store, we call our own token (session.id)
    // appenToken (Ooooooh...)
    return {
        appenToken: session.id,
    }
}

function userIsLoggedIn(req, res) {
    let sessionId = req.headers.appentoken;
    if (!shortid.isValid(sessionId)) {
        res.send(def_response('Invalid token (402)'))
        return false
    }
    let session = getSession(sessionId);
    if (!session) {
        res.send(def_response('Invalid token (401)'))
        return false
    }
    return true
}


function getSession(sessionId) {
    if (!shortid.isValid(sessionId)) {
        console.log('An invalid sessionId was sent to the backend! OMG! haxx')
        return {}
    }
    return db
        .get('session')
        .find({ id: sessionId })
        .value()
}

function updateSession(sessionId, dataToUpdate) {
    return db
        .get('session')
        .find({ id: sessionId })
        .assign(dataToUpdate)
        .write()
        .id
}

function createSession() {
    let newSessionId = shortid.generate()
    let session = {
        id: newSessionId,
    }
    db
        .get('session')
        .push(session)
        .write()
        .id
    return getSession(newSessionId)
}

// Write defaults to DB if empty
db.defaults({ events: [], session: [] })
    .write()

// This endpoint should NOT require a valid logged in user (since it's used for the login)
app.get('/auth/discord/callback', catchAsync(async (req, res) => {
    let code_from_discord = req.query.code
    if (!code_from_discord) {
        res.send(def_response('missing or invalid code'))
        console.log(code_from_discord + 'was invalid')
        return;
    }
    let response = await discord_get_token_from_callback(code_from_discord, 'identify guilds')

    // Fetch some cool stuff from discord about the logged in user :P
    let discordInfoAboutSelf = await http_get_discord('/users/@me', response.access_token)
    console.log(discordInfoAboutSelf)
    let discordGuildsSelf = await http_get_discord('/users/@me/guilds', response.access_token)
    console.log(discordGuildsSelf)

    console.log(response);
    if (!response.access_token) {
        res.send(def_response('Failed to login user via Discord'))
        return
    }
    
    let sessionData = {
        discord: response,
        discordUser: discordInfoAboutSelf,
        discordGuilds: discordGuildsSelf
    }

    const data = loginUser(sessionData)
    res.send(def_response(null, data))
}));

app.get('/auth/discord/login', (req, res) =>  {
    res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${discord_client_id}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect_url_enc}`);
});

// GET /event
app.get('/event', function (req, res) {
    if (!userIsLoggedIn(req, res)) { return false }
    const data = { events: getEvents() }
    res.send(def_response(null, data))
});

app.get('/event/:eventId/details', function (req, res) {
    if (!userIsLoggedIn(req, res)) { return false }
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
    if (!userIsLoggedIn(req, res)) { return false }
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
    if (!userIsLoggedIn(req, res)) { return false }
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
    if (!userIsLoggedIn(req, res)) { return false }
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
    if (!userIsLoggedIn(req, res)) { return false }
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
    if (!userIsLoggedIn(req, res)) { return false }
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
})
app.post('/event/:eventId/remove', function (req, res) {
    if (!userIsLoggedIn(req, res)) { return false }
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

    if (!isAdded(eventId, nickname)) {
        res.send(def_response('Player is not in this event'))
        return
    }
    //WE DO NOT TRUST FRONTEND.
removePlayer(nickname,eventId)
let eventFromDB = getEvent(eventId);
    if (!eventFromDB) {
        res.send(def_response('data was accepted, but an error happened when we tried to store it. Many brokend backend :('))
        return
    }
    res.send(def_response(null, { events: [eventFromDB] }))

});

