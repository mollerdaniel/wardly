const discordUrl = 'https://discordapp.com/'

export async function getUserName(token) {
    console.log('attempting to get user with token: ', token)
    const headers = new Headers({
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    return fetch(discordUrl + 'api/users/@me', { method: 'GET', headers: headers})
            .then(response => response.json())
            .then(json => {
                return json.username
            })
}