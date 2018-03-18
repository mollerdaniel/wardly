import getMockEvent from './mockEvents'

let fakeDb = { players: [], queue: [] }
let userName = '123'
let password = 'null'
let fakePlayerNames = ['Andra Köhen', 'Första Köhen', userName, 'Callisto', 'Lotus', 'inS', 'sommie',]

export function getAvailablePlayers() {
	return fakeDbGetPlayers()
}
export function getQueue() {
	return fakeDbGetQueue()
}

function randomName() {
	return fakePlayerNames.pop()
}

export function addMeToList() {
	fakeDbAddMe() // Replace with signup call to backend, backend should know who you are from token/something
}
export function addMeToWaitingList() {
	fakeDbAddQueue()
}

export function fakeDbGetPlayers() {
	return fakeDb.players // Replace with fetch call to backend returning the active list+events
}

export function fakeDbGetQueue() {
	return fakeDb.queue
}

export function fakeDbAddQueue() {
	let name = randomName()
	fakeDb.queue.push(name)
}

export function fakeDbAddMe() {
	let name = randomName()
	fakeDb.players.push(name)
}

export function getEvents() {
	return getMockEvent()
}
export function setUsername(user) {
	userName = user
	fakePlayerNames = ['Andra Köhen', 'Första Köhen', userName, 'Callisto', 'Lotus', 'inS', 'sommie',]

}
export function setPassword(pass) {
	password = pass

}