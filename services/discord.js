const discordUrl = 'https://discordapp.com/'

const getHeaders = (token) => new Headers({
    'Authorization': 'Bearer ' + token, 
    'Content-Type': 'application/x-www-form-urlencoded'
})

export default async function getUserData(token) {
    console.log('getting user data...')
    const userData = {
        username: await getUserName(token),
        avatar: await getAvatar(token),
        guilds: await getGuilds(token)
    };
    return userData;
}

async function getUserName(token) {
    console.log('attempting to get user with token: ', token)
    const headers = getHeaders(token)
    return fetch(discordUrl + 'api/users/@me', { method: 'GET', headers: headers})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                return json.username
            })
}

async function getAvatar(token) {
    const headers = getHeaders(token)
    const baseAvatarUrl = 'https://cdn.discordapp.com/avatars'

    return fetch(discordUrl + 'api/users/@me', { method: 'GET', headers: headers })
        .then(response => response.json())
        .then(json => {
            return `${baseAvatarUrl}/${json.id}/${json.avatar}.png`
        })
}

async function getGuilds(token) {
    const headers = getHeaders(token)
    return fetch(discordUrl + 'api/users/@me/guilds', { method: 'GET', headers: headers})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                return json
            })
}