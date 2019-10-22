/* eslint-disable no-undef */
describe('Fagområde: Pensjon', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('input').first()
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('PE');
  });
  it('korrekt sektor er valgt', () => {
    cy.get('#id-sektor')
      .should('have.value', 'PE');
  });
  it('velger BUC, SED, land og institusjon fra nedtrekksmenyene', () => {
    cy.get('#id-buctype')
      .select('P_BUC_01');

    cy.get('#id-buctype')
      .should('have.value', 'P_BUC_01');

    cy.get('#id-sedtype')
      .select('P2000');

    cy.get('#id-sedtype')
      .should('have.value', 'P2000');

    cy.get('#id-landkode')
      .select('EE');

    cy.get('#id-landkode')
      .should('have.value', 'EE');

    cy.get('#id-institusjon')
      .select('EE:TN70001975');

    cy.get('#id-institusjon')
      .should('have.value', 'EE:TN70001975');
  });
});
