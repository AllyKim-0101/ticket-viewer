const fetch = require("node-fetch");

const buildURL = (username, password) => {
  return `https://${username}:${password}@allykim.zendesk.com/api/v2/`;
};

const fetchTickets = (username, password, pageNumber) => {
  const url = buildURL(username, password);

  return fetch(`${url}tickets.json?page=${pageNumber}&per_page=25`).then(
    (data) => {
      return data.json();
    }
  );
};

module.exports = {
  buildURL,
  fetchTickets,
};
