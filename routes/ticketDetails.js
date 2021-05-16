var express = require("express");
const { default: fetch } = require("node-fetch");
var router = express.Router();
const zendeskAPI = require("../lib/zendeskAPI");

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

router.get("/:ticketId", function (req, res) {
  let id = req.params.ticketId;
  zendeskAPI
    .fetchDetails(username, password, id)
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
