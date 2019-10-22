/* eslint-disable no-undef */
describe('Fagområde: Arbeidsledighet', () => {
  beforeEach(() => {
    cy.visit('/opprett');

    cy.get('input').first()
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('UB');
  });
  it('korrekt sektor er valgt', () => {
    cy.get('#id-sektor')
      .should('have.value', 'UB');
  });
  it('velger BUC, SED, land og institusjon fra nedtrekksmenyene', () => {
    cy.get('#id-buctype')
      .select('UB_BUC_01');

    cy.get('#id-buctype')
      .should('have.value', 'UB_BUC_01');

    cy.get('#id-sedtype')
      .select('U001');

    cy.get('#id-sedtype')
      .should('have.value', 'U001');

    cy.get('#id-landkode')
      .select('BE');

    cy.get('#id-landkode')
      .should('have.value', 'BE');

    cy.get('#id-institusjon')
      .select('BE:0411729366');

    cy.get('#id-institusjon')
      .should('have.value', 'BE:0411729366');
  });
});
