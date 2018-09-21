import React, { Component } from 'react';
import PT from 'prop-types';

import { formatterDatoTilNorsk } from '../../../utils/dato';
import * as Nav from '../../../utils/navFrontend';
import PanelHeader from '../../panelHeader/panelHeader';
import { IkonFraKjonn } from '../../IkonFraKjonn';
import * as MPT from '../../../proptypes';
import * as API from '../../../services/api';

const uuid = require('uuid/v4');


const PersonSokResultat = props => {
  const {
    kjoenn, fornavn, etternavn, fnr, fdato, familierelasjon,
  } = props.person;

  const { leggTilHandler, familierelasjonKodeverk, oppdaterFamilierelajon } = props;

  const panelUndertittel = (
    <div className="panelheader__undertittel">
      <span>Fødselsnummer: {fnr}</span>
      <span>Fødselsdato: {formatterDatoTilNorsk(fdato)}</span>
    </div>
  );


  return (
    <Nav.Panel border className="personsok__kort">
      <PanelHeader ikon={IkonFraKjonn(kjoenn)} tittel={`${fornavn} ${etternavn}`} undertittel={panelUndertittel} />
      <Nav.Select
        label="Familierelasjon"
        bredde="fullbredde"
        className="familierelasjoner__input"
        value={familierelasjon}
        onChange={oppdaterFamilierelajon}>
        <option value="" disabled>- velg -</option>
        {familierelasjonKodeverk && familierelasjonKodeverk.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
      </Nav.Select>
      <Nav.Knapp onClick={leggTilHandler} className="familierelasjoner__knapp">
        <Nav.Ikon kind="tilsette" size="20" className="familierelasjoner__knapp__ikon" />
        <div className="familierelasjoner__knapp__label">Legg til</div>
      </Nav.Knapp>
    </Nav.Panel>
    );
}


class AnnenRelatertTPSPerson extends Component {
  // 3. La saksbehandler oppgi relasjon
  // 4. Dispatche til redux (hele objektet)

  state = { sok: '', person: null }

  sokEtterFnr = () => {
    const { sok } = this.state;
    API.Personer.hentPerson(sok).then(response => {
      this.setState({ person: response });
    });
  };

  updateSok = event => {
    this.setState({ sok: event.target.value });
  };

  leggTilHandler = () => {
    this.props.leggTilTPSrelasjon(this.state.person);
  };

  oppdaterFamilierelajon = event => {
    this.setState({ person: { ...this.state.person, rolle: event.target.value } });
  };

  render() {
    const { leggTilHandler, sokEtterFnr, oppdaterFamilierelajon } = this;

    const { person } = this.state;
    const { familierelasjonKodeverk } = this.props;

    const sokefelt = <div><Nav.Input label="Fødsels eller dnr" value={this.state.sok} onChange={this.updateSok} /><Nav.Knapp onClick={sokEtterFnr}>Søk</Nav.Knapp></div>

    return (
      <div>
        <div>
          {sokefelt}
        </div>
        {person && <PersonSokResultat person={person} leggTilHandler={leggTilHandler} familierelasjonKodeverk={familierelasjonKodeverk} oppdaterFamilierelajon={oppdaterFamilierelajon} />}
      </div>
    );
  }
}

AnnenRelatertTPSPerson.propTypes = {
  leggTilTPSrelasjon: PT.func.isRequired,
};

export { AnnenRelatertTPSPerson };
