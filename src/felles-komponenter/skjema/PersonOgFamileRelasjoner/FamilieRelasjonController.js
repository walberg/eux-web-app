import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';

import * as MPT from '../../../proptypes';
import * as Nav from '../../../utils/navFrontend';

import { vaskInputDato } from '../../../utils/dato';

import * as KodeverkSelectors from '../../../ducks/kodeverk/selectors';
import { PersonSelectors } from '../../../ducks/person';

import { FamilieRelasjonPanel } from './FamilieRelasjonPanel';
import { FamilieRelasjonUtland } from './FamilieRelasjonUtland';
import { TPSRelasjonEnkelt } from './TPSRelasjonEnkelt';
import { AnnenRelatertTPSPerson } from './AnnenRelatertTPSPerson';

import './familierelasjoner.css';

const uuid = require('uuid/v4');

class FamilieRelasjonController extends Component {
  state = {
    spesialRelasjon: {
      fnr: '', fdato: '', nasjonalitet: '', rolle: '', kjoenn: '', fornavn: '', etternavn: '',
    },
    ui: {
      visRelatertTPS: false,
      visRelatertUtland: false,
    },
  };

  kanSpesialRelasjonLeggesTil = () => {
    const { spesialRelasjon } = this.state;
    const {
      fnr, rolle, nasjonalitet, kjoenn, fornavn, etternavn,
    } = spesialRelasjon;
    return (fnr && rolle && nasjonalitet && kjoenn && fornavn && etternavn);
  };

  resettSpesialRelasjonsFelter = () => {
    this.setState({
      spesialRelasjon: {
        fnr: '', fdato: '', nasjonalitet: '', rolle: '', kjoenn: '', fornavn: '', etternavn: '',
      },
    });
  };

  leggTilSpesialRelasjon = () => {
    const { fields } = this.props;
    const { kanSpesialRelasjonLeggesTil } = this;
    const { spesialRelasjon } = this.state;

    const vasketRelasjon = {
      rolle: spesialRelasjon.rolle,
      fnr: spesialRelasjon.fnr,
      fdato: spesialRelasjon.fdato || '',
      nasjonalitet: spesialRelasjon.nasjonalitet,
      fornavn: spesialRelasjon.fornavn,
      etternavn: spesialRelasjon.etternavn,
      kjoenn: spesialRelasjon.kjoenn,
    };

    if (kanSpesialRelasjonLeggesTil()) {
      this.resettSpesialRelasjonsFelter();
      fields.push(vasketRelasjon);
    }
  };

  leggTilTPSrelasjon = relasjon => {
    /* Personer fra TPS har alltid norsk nasjonalitet. Derfor default til denne. */
    const { fields } = this.props;
    const vasketRelasjon = {
      ...relasjon,
      nasjonalitet: 'NO',
    };
    return fields.push(vasketRelasjon);
  };

  oppdaterState = (felt, event) => {
    const { value } = event.currentTarget;
    this.setState({ spesialRelasjon: { ...this.state.spesialRelasjon, [felt]: value } });
  };

  vaskInputDatoOgOppdater = (felt, event) => {
    const { value } = event.currentTarget;
    const nyDato = vaskInputDato(value) || '';
    const dummyEvent = { currentTarget: { value: nyDato } };
    this.oppdaterState(felt, dummyEvent);
  };

  slettRelasjon = fnr => {
    const { fields } = this.props;
    const index = fields.getAll().findIndex(relasjon => relasjon.fnr === fnr);
    fields.remove(index);
  };

  visSkjulRelatertTPS = () => {
    this.setState({ ui: { ...this.state.ui, visRelatertTPS: !this.state.ui.visRelatertTPS } });
  };
  visSkulRelatertUtland = () => {
    this.setState({ ui: { ...this.state.ui, visRelatertUtland: !this.state.ui.visRelatertUtland } });
  };

  render() {
    const {
      familierelasjonKodeverk, kjoennKodeverk, landKodeverk, fields, tpsrelasjoner,
    } = this.props;
    const valgteRelasjoner = fields.getAll();

    const gjenstaendeRelasjonerFraTPS = tpsrelasjoner.reduce((samling, enkeltTPSRelasjon) => {
      const erAlleredeLagtTil = valgteRelasjoner.some(r => r.fnr === enkeltTPSRelasjon.fnr);
      return (erAlleredeLagtTil ?
        [...samling]
        :
        [...samling, <TPSRelasjonEnkelt key={uuid()} kodeverk={familierelasjonKodeverk} relasjon={enkeltTPSRelasjon} leggTilTPSrelasjon={this.leggTilTPSrelasjon} />]
      );
    }, []);

    return (
      <div className="familerelasjoner">
        {valgteRelasjoner && valgteRelasjoner.map((relasjon, indeks) =>
          (<FamilieRelasjonPanel
            key={uuid()}
            familierelasjonKodeverk={familierelasjonKodeverk}
            landKodeverk={landKodeverk}
            relasjon={relasjon}
            indeks={indeks}
            slettRelasjon={this.slettRelasjon}
          />))
        }

        <Nav.Fieldset className="familierelasjoner__utland" legend="Fant følgende familiemedlemmer i TPS:">
          { gjenstaendeRelasjonerFraTPS }
          { (tpsrelasjoner.length > 0 && gjenstaendeRelasjonerFraTPS.length === 0) ? <Nav.Panel>(Du har lagt til alle som fantes i listen.)</Nav.Panel> : null }
          { !tpsrelasjoner && <Nav.Panel>(Ingen familierelasjoner funnet i TPS)</Nav.Panel> }
        </Nav.Fieldset>

        <h2>Person uten fødsels- eller d-nummer</h2>
        <Nav.Knapp onClick={this.visSkulRelatertUtland} >+ Legg til familiemedlem uten d-/f.nr </Nav.Knapp>
        { this.state.ui.visRelatertUtland && <FamilieRelasjonUtland
          spesialRelasjon={this.state.spesialRelasjon}
          oppdaterState={this.oppdaterState}
          kjoennKodeverk={kjoennKodeverk}
          landKodeverk={landKodeverk}
          familierelasjonKodeverk={familierelasjonKodeverk}
          leggTilSpesialRelasjon={this.leggTilSpesialRelasjon}
          vaskInputDatoOgOppdater={this.vaskInputDatoOgOppdater}
          kanSpesialRelasjonLeggesTil={this.kanSpesialRelasjonLeggesTil}
        />}
        <h2>TPS person uten relasjon</h2>
        <Nav.Knapp onClick={this.visSkjulRelatertTPS} >+ Legg til familiemedlem fra TPS </Nav.Knapp>
        { this.state.ui.visRelatertTPS && <AnnenRelatertTPSPerson leggTilTPSrelasjon={this.leggTilTPSrelasjon} familierelasjonKodeverk={familierelasjonKodeverk} /> }
      </div>
    );
  }
}

FamilieRelasjonController.propTypes = {
  tpsrelasjoner: PT.arrayOf(MPT.FamilieRelasjon),
  familierelasjonKodeverk: PT.arrayOf(MPT.Kodeverk),
  kjoennKodeverk: PT.arrayOf(MPT.Kodeverk),
  fields: PT.object.isRequired,
  landKodeverk: PT.arrayOf(MPT.Kodeverk),
};
FamilieRelasjonController.defaultProps = {
  tpsrelasjoner: [],
  familierelasjonKodeverk: [],
  kjoennKodeverk: [],
  landKodeverk: [],
};

const mapStateToProps = state => ({
  tpsrelasjoner: PersonSelectors.familieRelasjonerSelector(state),
  familierelasjonKodeverk: KodeverkSelectors.familierelasjonerSelector(state),
  kjoennKodeverk: KodeverkSelectors.kjoennSelector(state),
  landKodeverk: KodeverkSelectors.landkoderSelector(state),
});

export default connect(mapStateToProps)(FamilieRelasjonController);
