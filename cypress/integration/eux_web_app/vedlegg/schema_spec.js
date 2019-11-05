/* eslint-disable no-undef */
describe('Schema submit med korrekte felter', () => {
  it('POST ved ferdig utfylt skjema', () => {
    cy.on('window:before:load', win => {
      // eslint-disable-next-line no-param-reassign
      win.fetch = null;
    });

    cy.server();

    cy.route('POST', 'api/rina/vedlegg')
      .as('vedlegg');

    cy.visit('/vedlegg');

    cy.get('#journalpostID')
      .type('123');

    cy.get('#dokumentID')
      .type('123');

    cy.get('#rinasaksnummer')
      .type('161007')
      .type('{enter}');

    cy.get('#id-rinadokument')
      .select('760c632d67da4bc');

    cy.get('[data-cy=hovedknapp-send-vedlegg]').click();

    cy.wait('@vedlegg').its('request.body').should('contain', {
      dokumentID: '123',
      journalpostID: '123',
      rinaNrErGyldig: true,
      rinaNrErSjekket: true,
      rinadokumentID: '760c632d67da4bc',
      rinasaksnummer: '161007',
    });

    cy.get('.alertstripe.alertstripe--suksess')
      .should('exist');
  });
});
