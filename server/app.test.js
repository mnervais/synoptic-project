const request = require("supertest");
const { response } = require("./app");
const app = require("./app");

describe("Events API", () => {
  // POST
  it("POST /events                          --> 201 - Created", () => {
    return request(app)
      .post("/events")
      .send({
        title: "Test Event",
        date: "2020-01-01",
        time: "00:00",
        description: "",
        contact: "",
        long: 0.0,
        lat: 0.0,
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: "Test Event",
            date: expect.any(String),
            time: expect.any(String),
            description: expect.any(String),
            contact: expect.any(String),
            long: expect.any(Number),
            lat: expect.any(Number),
          })
        );
      });
  });
  it("POST /events                          --> 400 - Bad request", () => {
    return request(app)
      .post("/events")
      .send({
        title: null,
        date: null,
        time: null,
        description: null,
        contact: null,
        long: null,
        lat: null,
      })
      .expect(400);
  });

  // GET
  // /events
  it("GET  /events                          --> array of events", () => {
    return request(app)
      .get("/events")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              description: expect.any(String),
              contact: expect.any(String),
              long: expect.any(Number),
              lat: expect.any(Number),
            }),
          ])
        );
      });
  });
  it("GET  /events?title                    --> array of events that contain title", () => {
    return request(app)
      .get("/events?title=event")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title:
                expect.stringContaining("Event") ||
                expect.stringContaining("event"),
              date: expect.any(String),
              time: expect.any(String),
              description: expect.any(String),
              contact: expect.any(String),
              long: expect.any(Number),
              lat: expect.any(Number),
            }),
          ])
        );
      });
  });
  it("GET  /events?long                     --> array of events that equals longitude", () => {
    return request(app)
      .get("/events?long=51.919629")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              description: expect.any(String),
              contact: expect.any(String),
              long: 51.919629,
              lat: expect.any(Number),
            }),
          ])
        );
      });
  });
  it("GET  /events?lat                      --> array of events that equals latitude", () => {
    return request(app)
      .get("/events?lat=-0.656912")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              description: expect.any(String),
              contact: expect.any(String),
              long: expect.any(Number),
              lat: -0.656912,
            }),
          ])
        );
      });
  });
  it("GET  /events?long?lat?radius          --> array of events that are within the radius of the location", () => {
    return request(app)
      .get("/events?long=51.919629&lat=-0.656912&radius=10")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              date: expect.any(String),
              time: expect.any(String),
              description: "Inside event 1s 10 mile radius",
              contact: expect.any(String),
              long: expect.any(Number),
              lat: expect.any(Number),
            }),
          ])
        );
      });
  });

  // /events/:id
  it("GET  /events/:id                      --> event by id", () => {
    return request(app)
      .get("/events/13")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 13,
            title: expect.any(String),
            date: expect.any(String),
            time: expect.any(String),
            description: expect.any(String),
            contact: expect.any(String),
            long: expect.any(Number),
            lat: expect.any(Number),
          })
        );
      });
  });
  it("GET  /events/:id                      --> 400 - Bad request", () => {
    return request(app).get("/events/s").expect(400);
  });
});
