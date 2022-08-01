/// <reference types="cypress"/>

describe("testando Upvote", () => {
    it("Upvote",() => {

    cy.visit("http://localhost:3000")
    it("dando like", () => {

        await cy.get(':nth-child(4) > :nth-child(1)').should("be.visible");

        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path')
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
        cy.get(':nth-child(4) > :nth-child(3) > :nth-child(1) > path').click()
    })
    })
})