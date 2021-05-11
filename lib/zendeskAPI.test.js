const zendeskAPI = require('./zendeskAPI');

describe('buildURL', () => {
    test('when given username and password, add basic auth with them', () => {
        expect(zendeskAPI.buildURL("ally", "password")).toBe('https://ally:password@allykim.zendesk.com/api/v2/tickets.json')
    })
})
