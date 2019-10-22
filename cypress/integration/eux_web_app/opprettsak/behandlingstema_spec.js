/* eslint-disable no-undef */
describe('Behandlingstema', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('input').first()
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('AW');
  });
  it('behandlingstema-komponent vises hvis sektor er valgt', () => {
    cy.get('#id-behandlings-tema')
      .should('exist');
  });
  it('knapp vis saker er disabled hvis ikke tema er valgt i nedtrekksliste', () => {
    cy.get('[data-cy=vis-behandlingstema-knapp]')
      .should('be.disabled');

    cy.get('#id-behandlings-tema')
      .select('GEN')
      .should('have.value', 'GEN');
  });
  it('viser fagsakerliste ved klikk', () => {
    cy.get('#id-behandlings-tema')
      .select('GEN');

    cy.get('[data-cy=vis-behandlingstema-knapp]')
      .click();
  });
  describe('Behandlingstema: Fagsakerliste', () => {
    beforeEach(() => {
      cy.get('#id-behandlings-tema')
        .select('GEN');

      cy.get('[data-cy=vis-behandlingstema-knapp]')
        .click();
    });
    it('fagsaksliste vises', () => {
      cy.get('#id-fagsaker')
        .should('exist');
    });
    it('det er mulig å velge en sak fra fagsakslisten', () => {
      cy.get('#id-fagsaker')
        .select('awYRK:34243232223')
        .should('have.value', 'awYRK:34243232223');
    });
  });
});
