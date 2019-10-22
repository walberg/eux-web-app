/* eslint-disable no-undef */
describe('Fagområde: Yrkesskade og yrkessykdom', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('input').first()
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('AW');
  });
  it('korrekt sektor er valgt', () => {
    cy.get('#id-sektor')
      .should('have.value', 'AW');
  });
  it('velger BUC, SED, land og institusjon fra nedtrekksmenyene', () => {
    cy.get('#id-buctype')
      .select('AW_BUC_06a');

    cy.get('#id-buctype')
      .should('have.value', 'AW_BUC_06a');

    cy.get('#id-sedtype')
      .select('DA031');

    cy.get('#id-sedtype')
      .should('have.value', 'DA031');

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
