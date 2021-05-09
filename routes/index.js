const fetch = require("node-fetch");
var express = require("express");
var router = express.Router();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

let url = `https://${username}:${password}@allykim.zendesk.com/api/v2/tickets.json`;
/* GET home page. */
router.get("/", function (req, res, next) {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((parsedData) => {
      console.log(parsedData);
      res.render("index", {
        title: "Zendesk Ticket Viewer",
        numberOfTicket: parsedData.count,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
