export default function getMockEvent() {
    let now = new Date()

    function addDays(date, howManyDays) {
        return new Date(date.setDate(date.getDate() + howManyDays))
    }

    function addHours(date, howManyHours) {
        return new Date(date.setHours(date.getHours() + howManyHours))
    }

    return [
        {
            "id": "231312",
            "game": "CSGO",
            "requiredPlayers": 5,
            "startTime": addHours(new Date(), 1),
            "endTime": addHours(new Date(), 3),
            "currentPlayers": ['inS', 'Lotus']
        },
        {
            "id": "1337",
            "game": "CSGO",
            "requiredPlayers": 5,
            "startTime": addHours(new Date(), 5),
            "endTime": addHours(new Date(), 8),
            "currentPlayers": ['inS', 'Lotus', 'Callisto']
        },

        {
            "id": "13365767",
            "game": "CSGO",
            "requiredPlayers": 5,
            //tomorrow
            "startTime": addDays(new Date(), 1),
            "endTime": addDays(addHours(new Date(), 3), 1),
            "currentPlayers": ['inS', 'friberg', 'Lotus', 'Callisto']
        },

        {
            "id": "13365767367",
            "game": "CSGO",
            "requiredPlayers": 5,
            //ten days from now
            "startTime": addDays(new Date(), 10),
            "endTime": addDays(addHours(new Date(), 2), 10),
            "currentPlayers": ['dmlr', 'friberg', 'Lotus', 'inS']
        },
    ]
}