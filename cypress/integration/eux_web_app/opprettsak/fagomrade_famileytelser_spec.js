/* eslint-disable no-undef */
describe('Fagområde: Familieytelser', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('[data-cy=personsok-input]')
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('FB');
  });
  it('korrekt sektor er valgt', () => {
    cy.get('#id-sektor')
      .should('have.value', 'FB');
  });
  it('velger BUC, SED, land og institusjon fra nedtrekksmenyene', () => {
    cy.get('#id-buctype')
      .select('FB_BUC_01');

    cy.get('#id-buctype')
      .should('have.value', 'FB_BUC_01');

    cy.get('#id-sedtype')
      .select('F001');

    cy.get('#id-sedtype')
      .should('have.value', 'F001');

    cy.get('#id-landkode')
      .select('NO');

    cy.get('#id-landkode')
      .should('have.value', 'NO');

    cy.get('#id-institusjon')
      .select('NO:NAVT002');

    cy.get('#id-institusjon')
      .should('have.value', 'NO:NAVT002');
  });
});

describe('Familerelasjoner', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('[data-cy=personsok-input]')
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('FB');
  });
  it('familierelasjoner vises hvis sektor FB', () => {
    cy.get('.familierelasjoner')
      .should('exist');
  });
  it('viser PEN BLYANT som ektefelle', () => {
    cy.get('[data-cy=tpsrelasjon-kort]')
      .eq(0)
      .contains('PEN BLYANT - Ektefelle til');
  });
  it('click på LEGG TIL legger til PEN BLYANT under valgte familierelasjoner', () => {
    cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
      .eq(1)
      .click();

    cy.get('[data-cy=valgt-tpsrelasjon-kort]')
      .contains('LITEN BLYANT - Barn av');
  });
  it('legger til og fjerner alle tps-relasjoner', () => {
    cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
      .eq(0)
      .click();

    cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
      .eq(0)
      .click();

    cy.get('[data-cy=slett-tpsrelasjon-knapp]')
      .eq(0)
      .click();

    cy.get('[data-cy=slett-tpsrelasjon-knapp]')
      .eq(0)
      .click();

    cy.get('[data-cy=valgt-tpsrelasjon-kort')
      .should('not.exist');
  });
  describe('Person uten fødsels- eller d-nummer', () => {
    it('knapp for å vise relatertutlands komponent vises hvis sektor FB', () => {
      cy.get('[data-cy=vis-relatertutland-knapp]')
        .should('exist');
    });
    it('relatertutland vises ved click på knapp', () => {
      cy.get('[data-cy=vis-relatertutland-knapp')
        .click();

      cy.get('[data-cy=relatertutland-fieldset')
        .should('exist');
    });
    describe('Person uten fødsels- eller d-nummer: skjema', () => {
      beforeEach(() => {
        cy.get('[data-cy=vis-relatertutland-knapp')
          .click();
      });
      it('tester!', () => {

      });
    });
  });
});
