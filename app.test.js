const app = require("./app");
const zendeskAPI = require("./lib/zendeskAPI");
const request = require("supertest");
const { response } = require("express");
const parser = new DOMParser();

jest.mock("./lib/zendeskAPI", () => {
  const fakeTickets = require("./faketickets.json");
  return {
    fetchTickets: jest.fn().mockResolvedValue(fakeTickets),
  };
});

describe("homepage", () => {
  test("returns 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(200);
  });

  test("shows the first 25 tickets", async () => {
    const response = await request(app).get("/");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelectorAll("li").length).toBe(25);
  });

  test("shows the number of available tickets", async () => {
    const response = await request(app).get("/");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelector("#numberOfTicket").innerHTML).toEqual("102");
  });
});

describe("ticket details", () => {
  test.todo("returns 200 status code");
  test.todo("shows the ticket subject");
  test.todo("shows the ticket description");
});
