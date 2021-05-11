

const buildURL = (username, password) => {
    return `https://${username}:${password}@allykim.zendesk.com/api/v2/tickets.json`
}

module.exports = {
    buildURL
}
