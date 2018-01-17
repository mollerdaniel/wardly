export async function getAvailablePlayers() {
    //in the future we will use fetch() to grab this from the server, or use websockets or something!
    let response = Math.floor(Math.random() * 6)
    return response
}