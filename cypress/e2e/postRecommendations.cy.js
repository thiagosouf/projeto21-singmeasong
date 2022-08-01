/// <reference types="cypress"/>

import { faker } from "@faker-js/faker";

const musica = {
  name: "Querido meu amor",
  youtubeLink: "https://www.youtube.com/watch?v=4XKGfziuw5c",
};

describe("inserir recomendação e likes", () => {
  it("recomendando video", () => {
    const video = {
      name: faker.name.findName(),
      youtubeLink: "https://www.youtube.com/watch?v=" + faker.name.firstName(),
    };

    cy.visit("http://localhost:3000");
    cy.get("div").find("input").first().type(video.name);
    cy.get("div").find("input").last().type(video.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as(
      "recomend"
    );
    cy.get("div").find("button").click();
    cy.wait("@recomend");

    cy.contains(video.name).should("be.visible");
  });

  it("inserindo like", () => {
    cy.wait(2000);

    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(1) > path").click();
  });

  it("inserindo dislike", () => {
    cy.wait(2000);
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();

    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
    cy.get(":nth-child(4) > :nth-child(3) > :nth-child(2) > path").click();
  });

  it("clicando em top", () => {
    cy.wait(2000);
    cy.get(".sc-gsnTZi > :nth-child(2)").click();
  });

  it("clicando em random", () => {
    cy.wait(2000);
    cy.get(".sc-gsnTZi > :nth-child(3)").click();
  });

  it("clicando em home", () => {
    cy.wait(2000);
    cy.get(".sc-gsnTZi > :nth-child(1)").click();
  });

  it("recomendando video com nome vazio (ERRO)", () => {
    cy.wait(2000);
    cy.get("div").find("input").last().type(musica.youtubeLink);

    cy.get("div").find("button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });

  it("recomendando video com link vazio (ERRO)", () => {
    cy.wait(2000);
    cy.get("div").find("input").first().type(musica.name);

    cy.get("div").find("button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });

  it("recomendando video com nome repetido (ERRO)", () => {
    cy.wait(2000);
    cy.get("div").find("input").first().type(musica.name);
    cy.get("div").find("input").last().type(musica.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as(
      "recomend"
    );
    cy.get("div").find("button").click();
    cy.wait("@recomend");

    cy.contains(musica.name).should("be.visible");

    cy.get("div").find("input").first().type(musica.name);
    cy.get("div").find("input").last().type(musica.youtubeLink);

    cy.get("div").find("button").click();

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Error creating recommendation!");
    });
  });
});
