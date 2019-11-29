/* eslint-disable no-undef */
describe('Personpanel', () => {
  beforeEach(() => {
    cy.visit('/opprett');
  });
  it('viser modal ved klikk', () => {
    cy.get('[aria-label="Navigasjonslink tilbake til forsiden"]')
      .click();

    cy.get('[role="dialog"]')
      .should('exist');
  });
  it('navigerer til forside ved klikk på avbryt', () => {
    cy.get('[aria-label="Navigasjonslink tilbake til forsiden"]')
      .click();

    cy.get('[data-cy="avbryt-modal-hovedknapp"]')
      .click();

    cy.url()
      .should('be.equal', 'http://localhost:3000/');
  });
  it('lukker modal ved klikk på fortsett', () => {
    cy.get('[aria-label="Navigasjonslink tilbake til forsiden"]')
      .click();

    cy.get('[data-cy="fortsett-modal-hovedknapp"]')
      .click();

    cy.get('[role="dialog"]')
      .should('not.exist');
  });
});
