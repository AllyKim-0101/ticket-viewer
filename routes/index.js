const express = require("express");
const zendeskAPI = require("../lib/zendeskAPI");
const router = express.Router();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

/* GET home page. */
router.get("/", function (req, res, next) {
  let pageNumber = parseInt(req.query.page) || 1;
  zendeskAPI
    .fetchTickets(username, password, pageNumber)
    .then((parsedData) => {
      if (!parsedData.error) {
        res.render("index", {
          title: "Zendesk Ticket Viewer",
          numberOfTicket: parsedData.count,
          list: parsedData.tickets,
          nextPage: parsedData.tickets.length < 25 ? undefined : pageNumber + 1,
          previousPage: pageNumber > 1 ? pageNumber - 1 : undefined,
          error: undefined,
        });
      } else {
        console.log(parsedData);
        res.render("index", {
          title: "Zendesk Ticket Viewer",
          error: `Opps, We are so sorry :( Something went wrong: ${JSON.stringify(
            parsedData.error
          )}`,
        });
      }
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
