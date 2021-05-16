const app = require("./app");
const zendeskAPI = require("./lib/zendeskAPI");
const request = require("supertest");
const parser = new DOMParser();

jest.mock("./lib/zendeskAPI", () => {
  const fakeTickets = require("./faketickets.json");
  const fakeTicket = fakeTickets.tickets.find((ticket) => ticket.id == 2);
  return {
    fetchTickets: jest.fn().mockResolvedValue(fakeTickets),
    fetchDetails: jest.fn().mockResolvedValue({ ticket: fakeTicket }),
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

describe("shows ticket details", () => {
  test("returns 200 status code", async () => {
    const response = await request(app).get("/ticketDetails/2");
    expect(response.statusCode).toEqual(200);
  });

  test("shows the ticket subject", async () => {
    const response = await request(app).get("/ticketDetails/2");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelector("#subject").innerHTML).toEqual(
      "Subject: I need help"
    );
  });

  test("shows the ticket description", async () => {
    const response = await request(app).get("/ticketDetails/2");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelector("#description").innerHTML).toEqual(
      "Description: Hello,\nSomething dramatic happened and I could really use your help.\nThanks in advance,\nCustomer\n"
    );
  });
  test("shows the ticket Id", async () => {
    const response = await request(app).get("/ticketDetails/2");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelector("#id").innerHTML).toEqual("ID: 2");
  });
  test("shows the status of ticket", async () => {
    const response = await request(app).get("/ticketDetails/2");
    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelector("#status").innerHTML).toEqual("Status: open");
  });
});
