export default function getMockEvent() {
    let date = new Date()
    return [
        {
            "id": "231312",
            "game": "CSGO",
            "requiredPlayers": 5,
            "startTime": date,
            "endTime": date.setHours(date.getHours() + 2),
            "currentPlayers": ['inS', 'Lotus']
        },
        {
            "id": "1337",
            "game": "CSGO",
            "requiredPlayers": 5,
            "startTime": date.setHours(date.getHours() + 2),
            "endTime": date.setHours(date.getHours() + 4),
            "currentPlayers": ['inS', 'Lotus', 'Callisto']
        }
    ]
}