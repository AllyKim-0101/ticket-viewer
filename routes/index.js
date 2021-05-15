const fetch = require("node-fetch");
const express = require("express");
const zendeskAPI = require("../lib/zendeskAPI");
const router = express.Router();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

/* GET home page. */
router.get("/", function (req, res, next) {
  const url = zendeskAPI.buildURL(username, password);
  let pageNumber = parseInt(req.query.page) || 1;
  fetch(`${url}tickets.json?page=${pageNumber}&per_page=25`)
    .then((data) => {
      return data.json();
    })
    .then((parsedData) => {
      res.render("index", {
        title: "Zendesk Ticket Viewer",
        numberOfTicket: parsedData.count,
        list: parsedData.tickets,
        nextPage: parsedData.tickets.length < 25 ? undefined : pageNumber + 1,
        // diplay error message if parsedData contains error otherwise dont ,which means error in js will be undefined(=no error)
        error: parsedData.error
          ? `Opps, We are so sorry :( Something went wrong: ${parsedData.error.title} (${parsedData.error.message})`
          : undefined,
      });
    })
    //if we dont receive parsed data then disply an error to the user
    .catch((error) => {
      res.render("index", {
        title: "Zendesk Ticket Viewer",
        error: `Opps, we could not retrive the information from Zendesk. Here is what went wrong: ${error}`,
      });
    });
});

module.exports = router;
