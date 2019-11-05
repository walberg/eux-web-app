/* eslint-disable no-undef */
describe('Vedleggsinformasjon', () => {
  beforeEach(() => {
    cy.visit('/vedlegg');
  });
  it('kan skrive inn journalpost ID', () => {
    cy.get('#journalpostID')
      .type('123')
      .should('have.value', '123');
  });
  it('kan skrive inn dokument ID', () => {
    cy.get('#dokumentID')
      .type('123')
      .should('have.value', '123');
  });
  it('kan søke opp RINA-saker med klikk', () => {
    cy.get('#rinasaksnummer')
      .type('161007')
      .should('have.value', '161007');

    cy.get('[data-cy=knapp-sok-rina-saksnummer]')
      .click();

    cy.get('#id-rinadokument')
      .should('exist');
  });
  it('kan søke opp RINA-saker med enter', () => {
    cy.get('#rinasaksnummer')
      .type('161007')
      .should('have.value', '161007')
      .type('{enter}');

    cy.get('#id-rinadokument')
      .should('exist');
  });
  it('kan velge SED fra nedtrekksliste', () => {
    cy.get('#rinasaksnummer')
      .type('161007')
      .type('{enter}');

    cy.get('#id-rinadokument')
      .select('760c632d67da4bc')
      .should('have.value', '760c632d67da4bc');
  });
  it('SEND VEDLEGG disabled hvis skjema ikke er utfylt', () => {
    cy.get('[data-cy=hovedknapp-send-vedlegg]')
      .should('be.disabled');
  });
});
