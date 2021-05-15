const app = require("./app");
const zendeskAPI = require("./lib/zendeskAPI");
const request = require("supertest");
const parser = new DOMParser();

jest.mock("./lib/zendeskAPI", () => {
  const fakeTickets = require("./faketickets.json");
  return {
    fetchTickets: jest.fn().mockResolvedValue(fakeTickets),
  };
});

describe("homepage", () => {
  test("shows the first 25 tickets", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);

    const document = parser.parseFromString(response.text, "text/html");
    expect(document.querySelectorAll("li").length).toBe(25);
  });

  test("shows the number of available tickets", () => {
    return request(app)
      .get("/")
      .then((response) => {
        const document = parser.parseFromString(response.text, "text/html");
        expect(document.querySelector("#numberOfTicket").innerHTML).toEqual(
          "102"
        );
      });
  });
});
