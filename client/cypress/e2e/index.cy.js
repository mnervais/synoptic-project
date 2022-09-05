/// <reference types="cypress" />

describe("End to end tests", () => {
  it("Creates event and displays marker on map correctly", () => {
    // cy.visit("https://interactive-community-events.herokuapp.com/");
    cy.visit("http://localhost:3000");

    cy.wait(2000);
    cy.get("#map").dblclick();
    cy.get("#title").type(`Test Event 1{enter}`);
    cy.get("#button.submit").click();

    cy.wait(2000);
    cy.get("h3").contains("Test Event 1");
    cy.get("map");
  });

  it("Displays event details on marker click", () => {
    // cy.visit("https://interactive-community-events.herokuapp.com/");
    cy.visit("http://localhost:3000");

    cy.wait(2000);
    cy.get("map").children().click({
      multiple: true,
      force: true,
    });
    cy.wait(2000);
    cy.get("h3");
  });

  it("Doesn't show expired events", () => {
    // cy.visit("https://interactive-community-events.herokuapp.com/");
    cy.visit("http://localhost:3000");

    cy.wait(2000);
    cy.request("POST", "http://localhost:5000/events", {
      title: "Test Event Expired",
      date: "2020-09-04",
      time: "20:25",
      description: "",
      contact: "",
      long: -0.5968906714477629,
      lat: 51.94152142956532,
    });

    cy.wait(2000);
    cy.get("#titleInput").type(`Test Event Expired{enter}`);

    cy.wait(2000);
    cy.get("#searchResults").should("be.empty");
  });

  it("Shows searched events", () => {
    // cy.visit("https://interactive-community-events.herokuapp.com/");
    cy.visit("http://localhost:3000");

    cy.wait(2000);
    cy.request("POST", "http://localhost:5000/events", {
      title: "Test Event Search",
      date: "2023-09-04",
      time: "20:25",
      description: "",
      contact: "",
      long: -0.5968906714477629,
      lat: 51.94152142956532,
    });

    cy.wait(2000);
    cy.get("#titleInput").type(`Test Event Search{enter}`);

    cy.wait(2000);
    cy.get("#searchResults").should("not.be.empty");

    cy.wait(2000);
    cy.get(".list-group-item").contains("Test Event Search");
  });
  it("Should be navigable", () => {
    //     // cy.visit("https://interactive-community-events.herokuapp.com/");
    cy.visit("http://localhost:3000");

    cy.wait(2000);
    cy.get("#map")
      .trigger("mousedown", { which: 1 })
      .trigger("mousemove", { which: 1, x: 261, y: 500 })
      .trigger("mouseup")
      .wait(500);

    cy.get(".gmnoprint button.gm-control-active").click({
      multiple: true,
      force: true,
    });
  });
});
