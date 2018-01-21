export async function getAvailablePlayers() {
    //in the future we will use fetch() to grab this from the server, or use websockets or something!
    const names = ['Callisto', 'Lotus', 'inS', 'sommie', 'dmlr_']
    let howMany = Math.floor(Math.random() * 6)
    let randomList = names.sort(() => Math.random() > 0.5)
    return randomList.slice(0,howMany)
}