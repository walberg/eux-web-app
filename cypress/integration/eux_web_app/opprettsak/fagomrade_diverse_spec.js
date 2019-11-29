/* eslint-disable no-undef */
describe('Fagområde: Diverse', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('input').first()
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('MI');
  });
  it('korrekt sektor er valgt', () => {
    cy.get('#id-sektor')
      .should('have.value', 'MI');
  });
  it('velger BUC, SED, land og institusjon fra nedtrekksmenyene', () => {
    cy.get('#id-buctype')
      .select('M_BUC_01');

    cy.get('#id-buctype')
      .should('have.value', 'M_BUC_01');

    cy.get('#id-sedtype')
      .select('M030');

    cy.get('#id-sedtype')
      .should('have.value', 'M030');

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
