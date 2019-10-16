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
      .select('FB_BUC_01')
      .should('have.value', 'FB_BUC_01');

    cy.get('#id-sedtype')
      .select('F001')
      .should('have.value', 'F001');

    cy.get('#id-landkode')
      .select('NO')
      .should('have.value', 'NO');

    cy.get('#id-institusjon')
      .select('NO:NAVT002')
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
    it('knapp for å vise relatertutlands-komponent vises hvis sektor FB', () => {
      cy.get('[data-cy=vis-relatertutland-knapp]')
        .should('exist');
    });
    it('relatertutland skrus av og på  ved click på knapp', () => {
      cy.get('[data-cy=vis-relatertutland-knapp')
        .click();

      cy.get('[data-cy=relatertutland-fieldset')
        .should('exist');

      cy.get('[data-cy=vis-relatertutland-knapp')
        .click();

      cy.get('[data-cy=relatertutland-fieldset')
        .should('not.exist');
    });
    describe('Person uten fødsels- eller d-nummer: skjema', () => {
      beforeEach(() => {
        cy.get('[data-cy=vis-relatertutland-knapp]')
          .click();

        cy.get('#id-buctype')
          .select('FB_BUC_01');

        cy.get('#id-sedtype')
          .select('F001');

        cy.get('#id-landkode')
          .select('NO');

        cy.get('#id-institusjon')
          .select('NO:NAVT002');
      });
      it('setter ID, nasjonalitet, fornavn, etternavn, kjønn, fødselsdato og familierelasjon og legger til relasjon til valgte relasjoner', () => {
        cy.get('[data-cy=utenlandsk-id-input]')
          .type('121212')
          .should('have.value', '121212');

        cy.get('[data-cy=nasjonalitet-nedtrekksliste]')
          .select('CH')
          .should('have.value', 'CH');

        cy.get('[data-cy=fornavn-input]')
          .type('TJUKK')
          .should('have.value', 'TJUKK');

        cy.get('[data-cy=etternavn-input]')
          .type('TUSJ')
          .should('have.value', 'TUSJ');

        cy.get('[data-cy=kjoenn-nedtrekksliste]')
          .select('M')
          .should('have.value', 'M');

        cy.get('[data-cy=fodselsdato-input]')
          .type('121212')
          .should('have.value', '121212')
          .blur()
          .should('have.value', '12.12.2012');

        cy.get('[data-cy=familierelasjon-nedtrekksliste]')
          .select('BARN')
          .should('have.value', 'BARN');

        cy.get('[data-cy=legg-til-relatertutland-knapp]')
          .click();

        cy.get('[data-cy=valgt-tpsrelasjon-kort]')
          .contains('TJUKK TUSJ - Barn av');
      });
      it('ikke mulig å legge til mer enn en partner/ektefelle', () => {
        cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
          .first()
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
          .should('not.have.value', 'EKTE')
          .should('not.have.value', 'REPA')
          .should('not.have.value', 'SAMB');

        cy.get('[data-cy=legg-til-relatertutland-knapp]')
          .should('be.disabled');
      });
      it('ikke mulig å legge til mer enn en annen relasjon', () => {
        cy.get('[data-cy=vis-annenpersonsok-knapp]')
          .click();

        cy.get('[data-cy=annenpersonsok-input]')
          .type('16097317279');

        cy.get('[data-cy=annenpersonsok-knapp]')
          .click();

        cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
          .select('ANNEN');

        cy.get('[data-cy=annenpersonsok-kort-knapp]')
          .click();

        cy.get('[data-cy=familierelasjon-nedtrekksliste]')
          .should('not.have.value', 'ANNEN');
      });
    });
  });
  describe('Person uten registrert relasjon i TPS', () => {
    it('vises hvis sektor er UB', () => {
      cy.get('[data-cy=vis-annenpersonsok-knapp]')
        .should('exist');
    });
    it('viser og skjuler skjema for personnummersøk ved klikk på vis', () => {
      cy.get('[data-cy=vis-annenpersonsok-knapp]')
        .click();

      cy.get('[data-cy=annenpersonsok-input]')
        .should('exist');

      cy.get('[data-cy=vis-annenpersonsok-knapp]')
        .click();

      cy.get('[data-cy=annenpersonsok-input]')
        .should('not.exist');
    });
    it('soker opp og viser personkort hvis fnr finnes', () => {
      cy.get('[data-cy=vis-annenpersonsok-knapp]')
        .click();

      cy.get('[data-cy=annenpersonsok-input]')
        .type('16097317279')
        .should('have.value', '16097317279');

      cy.get('[data-cy=annenpersonsok-knapp]')
        .click();

      cy.get('[data-cy=annenpersonsok-kort]')
        .should('exist')
        .contains('ROBUST PENN');
    });
    it('hvis det søkes på samme fnr som bruker informeres det om dette', () => {
      cy.get('[data-cy=vis-annenpersonsok-knapp]')
        .click();

      cy.get('[data-cy=annenpersonsok-input]')
        .type('02026100715');

      cy.get('[data-cy=annenpersonsok-alert]')
        .should('exist')
        .contains('FNR 02026100715 tilhører bruker');
    });
    describe('Person uten registrert relasjon i TPS: skjema', () => {
      beforeEach(() => {
        cy.get('[data-cy=vis-annenpersonsok-knapp]')
          .click();

        cy.get('[data-cy=annenpersonsok-input]')
          .type('16097317279');

        cy.get('[data-cy=annenpersonsok-knapp]')
          .click();
      });
      it('legg til knapp er disabled hvis man ikke har valgt familerelasjon', () => {
        cy.get('[data-cy=annenpersonsok-kort-knapp]')
          .should('be.disabled');
      });
      it('velger familierelasjon og legger til relasjon i valgterelasjoner', () => {
        cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
          .select('BARN')
          .should('have.value', 'BARN');

        cy.get('[data-cy=annenpersonsok-kort-knapp]')
          .click();

        cy.get('[data-cy=valgt-tpsrelasjon-kort]')
          .contains('ROBUST PENN - Barn av');
      });
      it('ikke mulig å legge til mer enn en partner/ektefelle', () => {
        cy.get('[data-cy=legg-til-tpsrelasjon-knapp]')
          .first()
          .click();

        cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
          .should('not.have.value', 'EKTE')
          .should('not.have.value', 'REPA')
          .should('not.have.value', 'SAMB');
      });
      it('ikke mulig med mer enn en annen relasjon', () => {
        cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
          .select('ANNEN');

        cy.get('[data-cy=annenpersonsok-kort-knapp]')
          .click();

        cy.get('[data-cy=annenpersonsok-input]')
          .type('70057418034');

        cy.get('[data-cy=annenpersonsok-knapp]')
          .click();

        cy.get('[data-cy=annenpersonsok-kort-nedtrekksliste]')
          .should('not.have.value', 'ANNEN');
      });
    });
  });
  describe('AA Registeret', () => {
    beforeEach(() => {
      cy.get('#id-buctype')
        .select('FB_BUC_01');

      cy.get('#id-sedtype')
        .select('F001');
    });
    it('vises for korrekt sektor/BUC/SED', () => {
      cy.get('[data-cy=arbeidsforhold]')
        .should('exist');
    });
    it('viser arbeidsforhold etter klikk på søk', () => {
      cy.get('[data-cy=vis-arbeidsforhold-knapp]')
        .click();

      cy.get('[data-cy=arbeidsforhold-liste]')
        .should('exist');
    });
  });
});
