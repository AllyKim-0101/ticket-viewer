var express = require("express");
const { default: fetch } = require("node-fetch");
var router = express.Router();
const zendeskAPI = require("../lib/zendeskAPI");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

router.get("/:ticketId", function (req, res) {
  let id = req.params.ticketId;
  const url = zendeskAPI.buildURL(username, password);
  fetch(`${url}tickets/${id}.json`)
    .then((data) => data.json())
    .then((parsedData) => {
      res.render("ticketDetails", {
        ticketId: id,
        ticketDetails: parsedData.ticket,
      });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
