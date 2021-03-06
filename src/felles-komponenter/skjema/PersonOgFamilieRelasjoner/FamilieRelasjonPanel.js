import React from 'react';
import PT from 'prop-types';

import { kodeverkObjektTilTerm } from '../../../utils/kodeverk';
import { formatterDatoTilNorsk } from '../../../utils/dato';
import * as Nav from '../../../utils/navFrontend';
import PanelHeader from '../../panelHeader/panelHeader';
import * as MPT from '../../../proptypes';
import * as Eux from '../../../felles-komponenter/Ikon';

const FamilieRelasjonPanel = ({
  familierelasjonKodeverk,
  landKodeverk,
  relasjon: familie, slettRelasjon,
}) => {
  const {
    fornavn, etternavn, fnr, fdato, nasjonalitet, kjoenn,
  } = familie;

  const rolleObjekt = familierelasjonKodeverk.find(item => item.kode === familie.rolle);
  const nasjonalitetObjekt = landKodeverk.find(item => item.kode === nasjonalitet);

  const rolleTerm = kodeverkObjektTilTerm(rolleObjekt);
  const nasjonalitetTerm = kodeverkObjektTilTerm(nasjonalitetObjekt);

  const panelUndertittel = (
    <div className="panelheader__undertittel">
      <span>Fødselsnummer: {fnr}</span>
      <span>Fødselsdato: {formatterDatoTilNorsk(fdato)}</span>
      {nasjonalitetObjekt && <span>Nasjonalitet: {nasjonalitetTerm}</span>}
    </div>
  );
  const tittel = `${fornavn} ${etternavn}`.toUpperCase();
  return (
    <Nav.Panel border className="personsok__kort">
      <PanelHeader ikon={Eux.IkonFraKjonn(kjoenn)} tittel={`${tittel} - ${rolleTerm}`} undertittel={panelUndertittel} />
      <Nav.Knapp
        className="familierelasjoner__knapp familierelasjoner__knapp--slett"
        onClick={() => slettRelasjon(familie.fnr)}>
        <Eux.Icon kind="trashcan" size="20" className="familierelasjoner__knapp__ikon" />
        <div className="familierelasjoner__knapp__label">Fjern</div>
      </Nav.Knapp>
    </Nav.Panel>
  );
};

FamilieRelasjonPanel.propTypes = {
  indeks: PT.number.isRequired,
  familierelasjonKodeverk: PT.arrayOf(MPT.Kodeverk).isRequired,
  landKodeverk: PT.arrayOf(MPT.Kodeverk).isRequired,
  relasjon: MPT.FamilieRelasjon.isRequired,
  slettRelasjon: PT.func.isRequired,
};

export { FamilieRelasjonPanel };
