/* eslint-disable no-undef */
describe('Personpanel', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('[data-cy=personsok-input]')
      .type('02026100715');
  });
  it('søker opp bruker med fnr med click', () => {
    cy.get('[data-cy=personsok-knapp]')
      .click();

    cy.get('[data-cy=personsok-kort]')
      .should('contain', 'STOR BLYANT');
  });
  it('søker opp bruker med fnr etter fokus input og enter', () => {
    cy.get('[data-cy=personsok-input]')
      .type('{enter}');

    cy.get('[data-cy=personsok-kort]')
      .should('contain', 'STOR BLYANT');
  });
  it('fjerner bruker med click', () => {
    cy.get('[data-cy=personsok-input]')
      .type('{enter}');

    cy.get('[data-cy=fjern-person-knapp]')
      .click();

    cy.get('[data-cy=personsok-kort]')
      .should('not.exist');
  });
});
