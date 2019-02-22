import React, { Component } from 'react';
import PT from 'prop-types';
import _ from 'lodash';

import * as Nav from '../../../utils/navFrontend';
import * as MPT from '../../../proptypes';
import * as API from '../../../services/api';
import PersonSokResultat from '../../../komponenter/PersonSokResultat';
import './annenperson.css';

const defaultState = {
  sok: '', person: null, tpsperson: null, rolle: '', knappDisabled: true,
};

class AnnenRelatertTPSPerson extends Component {
  state = {
    ...defaultState,
  };

  sokEtterFnr = async () => {
    const { sok } = this.state;
    const { tpsrelasjoner, valgteRelasjoner } = this.props;
    const response = await API.Personer.hentPerson(sok);
    // Fjern relasjoner array, NOTE! det er kun relqasjoner som har rolle.
    const person = _.omit(response, 'relasjoner');
    const tpsperson = tpsrelasjoner.find(elem => elem.fnr === person.fnr);
    console.log(valgteRelasjoner);
    if (!tpsperson) {
      this.setState({ person, tpsperson: null });
    } else {
      this.setState({
        tpsperson, sok: '', person: null, rolle: '', knappDisabled: true,
      });
    }
  };

  updateSok = event => {
    this.setState({ sok: event.target.value });
  };

  leggTilPersonOgRolle = () => {
    const { rolle } = this.state;
    const person = { ...this.state.person, rolle };
    this.setState({
      ...defaultState,
    });
    this.props.leggTilTPSrelasjon(person);
  };

  oppdaterFamilierelajon = event => {
    const rolle = event.target.value;
    const person = { ...this.state.person, rolle };
    const knappDisabled = false;
    this.setState({ person, rolle, knappDisabled });
  };

  filtrerRoller = () => {
    const { familierelasjonKodeverk, valgteRelasjoner } = this.props;
    if (valgteRelasjoner.length > 0) {
      /*
      const KTObjects = familierelasjonKodeverk.filter(kt => {
        const valgtRelasjon = valgteRelasjoner.find(elem => elem.rolle === kt.kode);
        if (!valgtRelasjon) return true;
        return kt.kode !== valgtRelasjon.rolle;
      });
      */
      return familierelasjonKodeverk.filter(kt => kt.kode !== 'EKTE');
    }
    return [...familierelasjonKodeverk];
  };

  render() {
    const { leggTilPersonOgRolle, sokEtterFnr, oppdaterFamilierelajon } = this;

    const {
      person, rolle, tpsperson, knappDisabled,
    } = this.state;

    const Sokefelt = () => (
      <div className="annenpersonsok">
        <div className="annenpersonsok__skjema">
          <Nav.Input className="" label="" placeholder="Fødsels eller dnr" value={this.state.sok} onChange={this.updateSok} />
          <Nav.Knapp className="annenpersonsok__knapp" onClick={sokEtterFnr}>Søk</Nav.Knapp>
        </div>
      </div>
    );

    return (
      <div>
        <Sokefelt />
        {tpsperson && <p>{tpsperson.fnr} Familierelasjonen er allerede registrert i TPS</p>}
        {person && <PersonSokResultat
          person={person}
          rolle={rolle}
          knappDisabled={knappDisabled}
          leggTilHandler={leggTilPersonOgRolle}
          familierelasjonKodeverk={this.filtrerRoller()}
          oppdaterFamilierelajon={oppdaterFamilierelajon} />}
      </div>
    );
  }
}
AnnenRelatertTPSPerson.propTypes = {
  valgteRelasjoner: PT.any,
  tpsrelasjoner: PT.any.isRequired,
  tpsperson: PT.object,
  person: MPT.Person,
  familierelasjonKodeverk: PT.arrayOf(MPT.Kodeverk).isRequired,
  leggTilTPSrelasjon: PT.func.isRequired,
};
AnnenRelatertTPSPerson.defaultProps = {
  valgteRelasjoner: [],
  person: null,
  tpsperson: null,
};
export { AnnenRelatertTPSPerson };
