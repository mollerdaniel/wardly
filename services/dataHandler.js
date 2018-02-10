import getMockEvent from './mockEvents'

let fakeDb = {players: []}
let fakePlayerNames = ['Callisto', 'Lotus', 'inS', 'sommie', 'dmlr_']

export function getAvailablePlayers() {
    return fakeDbGetPlayers()
}

function randomName() {
	return fakePlayerNames.pop()
}

export function addMeToList() {
	fakeDbAddMe() // Replace with signup call to backend, backend should know who you are from token/something
}

export function fakeDbGetPlayers() {
	return fakeDb.players // Replace with fetch call to backend returning the active list+events
}

export function fakeDbAddMe() {
	let name = randomName()
	fakeDb.players.push(name)
}

export function getEvents() {
	return getMockEvent()
}