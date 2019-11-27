/* eslint-disable no-undef */
describe('Schema submit med korrekte felter', () => {
  it('POST ved ferdig utfylt skjema', () => {
    cy.on('window:before:load', win => {
      // eslint-disable-next-line no-param-reassign
      win.fetch = null;
    });

    cy.server();

    cy.route('POST', '/api/rina/sak')
      .as('sak');

    cy.visit('/opprett');

    cy.get('[data-cy=personsok-input]')
      .type('02026100715')
      .type('{enter}');

    cy.get('#id-sektor')
      .select('FB');

    cy.get('.knapp.knapp--hoved')
      .click();

    cy.get('#id-buctype')
      .select('FB_BUC_01');

    cy.get('#id-sedtype')
      .select('F001');

    cy.get('#id-landkode')
      .select('NO');

    cy.get('#id-institusjon')
      .select('NO:NAVT002');

    cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
      .eq(1)
      .click();

    cy.get('[data-cy=vis-relatertutland-knapp]')
      .click();

    cy.get('[data-cy=utenlandsk-id-input]')
      .type('121212');

    cy.get('[data-cy=nasjonalitet-nedtrekksliste]')
      .select('CH');

    cy.get('[data-cy=fornavn-input]')
      .type('TJUKK');

    cy.get('[data-cy=etternavn-input]')
      .type('TUSJ');

    cy.get('[data-cy=kjoenn-nedtrekksliste]')
      .select('M');

    cy.get('[data-cy=fodselsdato-input]')
      .type('121212');

    cy.get('[data-cy=familierelasjon-nedtrekksliste]')
      .select('BARN');

    cy.get('[data-cy=legg-til-relatertutland-knapp]')
      .click();

    cy.get('[data-cy=vis-annenpersonsok-knapp]')
      .click();

    cy.get('[data-cy=annenpersonsok-input]')
      .type('16097317279');

    cy.get('[data-cy=annenpersonsok-knapp]')
      .click();

    cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
      .select('BARN');

    cy.get('[data-cy=annenpersonsok-kort-knapp]')
      .click();

    cy.get('#id-behandlings-tema')
      .select('GEN');

    cy.get('[data-cy=vis-behandlingstema-knapp]')
      .click();

    cy.get('#id-fagsaker')
      .select('ubDAG:34243232223');

    cy.get('[data-cy=opprett-sak-hovedknapp]')
      .click().click();

    cy.wait('@sak').its('request.body.tilleggsopplysninger.familierelasjoner').should('contain', {
      etternavn: 'TUSJ',
      fdato: '2012-12-12',
      fnr: '121212',
      fornavn: 'TJUKK',
      kjoenn: 'M',
      nasjonalitet: 'CH',
      rolle: 'BARN',
    });
  });
});
