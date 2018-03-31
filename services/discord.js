const discordUrl = 'https://discordapp.com/'

export async function getUserName(token) {
    console.log('attempting to get user with token: ', token)
    const headers = new Headers({
        'Authorization': 'Bearer ' + token, 
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    return fetch(discordUrl + 'users/@me', { method: 'GET', headers: headers}).then((res) => {
        console.log('data', res)
        return 'inS'
    })
}