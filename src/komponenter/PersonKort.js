import React from 'react';

import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import { PanelHeader } from '../felles-komponenter/panelHeader';

import * as Eux from '../felles-komponenter/Ikon';

import './personsok.css';
import { formatterDatoTilNorsk } from '../utils/dato';


const PersonKort = ({ person }) => {
  const {
    fnr, fdato, fornavn, etternavn, kjoenn,
  } = person;

  const panelUndertittel = (
    <div className="panelheader__undertittel">
      <span>Fødselsnummer: {fnr}</span>
      <span>Fødselsdato: {formatterDatoTilNorsk(fdato)}</span>
    </div>
  );

  return (
    <div>
      <Nav.Panel className="personsok__kort">
        <PanelHeader ikon={Eux.IkonFraKjonn(kjoenn)} tittel={`${fornavn} ${etternavn}`} undertittel={panelUndertittel} />
        <Nav.Knapp
          className="familierelasjoner__knapp familierelasjoner__knapp--slett"
          onClick={() => window.location.reload()}
        >
          <Eux.Icon kind="trashcan" size="20" className="familierelasjoner__knapp__ikon" />
          <div className="familierelasjoner__knapp__label">Fjern</div>
        </Nav.Knapp>
      </Nav.Panel>
    </div>
  );
};

PersonKort.propTypes = {
  person: MPT.Person.isRequired,
};

export default PersonKort;
