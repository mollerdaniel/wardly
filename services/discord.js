const discordUrl = 'https://discordapp.com/'

const getHeaders = (token) => new Headers({
    'Authorization': 'Bearer ' + token, 
    'Content-Type': 'application/x-www-form-urlencoded'
})

export async function getUserName(token) {
    console.log('attempting to get user with token: ', token)
    const headers = getHeaders(token)
    return fetch(discordUrl + 'api/users/@me', { method: 'GET', headers: headers})
            .then(response => response.json())
            .then(json => {
                console.log(json)
                return json.username
            })
}

export async function getAvatar(token) {
    const headers = getHeaders(token)
    const baseAvatarUrl = 'https://cdn.discordapp.com/avatars'

    return fetch(discordUrl + 'api/users/@me', { method: 'GET', headers: headers })
        .then(response => response.json())
        .then(json => {
            return `${baseAvatarUrl}/${json.id}/${json.avatar}.png`
        })
}