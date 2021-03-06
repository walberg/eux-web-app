import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, clearAsyncError, stopSubmit, change } from 'redux-form';
import PT from 'prop-types';
import _ from 'lodash';

import * as EKV from 'eessi-kodeverk';
import * as Api from '../services/api';
import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';

import { FagsakSelectors } from '../ducks/fagsak';
import { KodeverkSelectors } from '../ducks/kodeverk';
import { LandkoderOperations, LandkoderSelectors } from '../ducks/landkoder';
import { RinasakOperations, RinasakSelectors } from '../ducks/rinasak';
import { ServerinfoSelectors } from '../ducks/serverinfo';
import { StatusLinje } from '../felles-komponenter/statuslinje';
import FamilieRelasjonsComponent from '../felles-komponenter/skjema/PersonOgFamilieRelasjoner';
import PersonSok from './personsok';

import './opprettsak.css';
import { ArbeidsforholdController, BehandlingsTemaer, Fagsaker } from './sak';
import AvsluttModal from '../komponenter/AvsluttModal';

const uuid = require('uuid/v4');

const btnStyle = {
  margin: '1.85em 0 0 0',
};

const sortBy = key => (a, b) => {
  if (a[key] > b[key]) return 1;
  return ((b[key] > a[key]) ? -1 : 0);
};

const initalState = {
  landKode: '',
  institusjonsID: '',
  institusjoner: [],
  tema: '',
  fagsaker: [],
  saksID: '',
  visModal: false,
};

class OpprettSak extends Component {
  state = {
    ...initalState,
  };

  // visFagsakerListe = () => ([EKV.Koder.sektor.FB, EKV.Koder.sektor.UB, EKV.Koder.sektor.AW].includes(this.props.valgtSektor) && this.state.tema.length > 0 && this.state.fagsaker.length > 0);
  visFagsakerListe = () => (this.props.valgtSektor.length > 0 && this.state.tema.length > 0 && this.state.fagsaker.length > 0);
  visArbeidsforhold = () => {
    const { valgtSektor, buctype, sedtype } = this.props;
    return EKV.Koder.sektor.FB === valgtSektor && EKV.Koder.buctyper.family.FB_BUC_01 === buctype && sedtype;
  };
  oppdaterBucKode = async event => {
    const { settBuctype, hentLandkoder } = this.props;
    const buctype = event.target.value;
    await settBuctype(buctype);
    await hentLandkoder(buctype);
    this.setState({ landKode: '' });
  };
  oppdaterLandKode = event => {
    const landKode = event.target.value;
    const { buctype } = this.props;
    Api.Institusjoner.hent(buctype, landKode).then(institusjoner => {
      this.setState({ landKode, institusjoner });
    });
  };

  oppdaterInstitusjonKode = event => {
    const institusjonsID = event.target.value;
    const { institusjoner } = this.state;
    this.setState({ institusjonsID, institusjoner });
  };

  oppdaterTemaListe = event => {
    const tema = event.target.value;
    this.setState({ tema, fagsaker: [] });
  };

  oppdaterFagsakListe = event => {
    const saksID = event.target.value;
    this.setState({ saksID });
  };
  visFagsaker = async () => {
    const { tema } = this.state;
    const { inntastetFnr: fnr, valgtSektor } = this.props;
    const fagsaker = await Api.Fagsaker.hent(fnr, valgtSektor, tema);
    this.setState({ tema, fagsaker });
  };

  skjemaSubmit = values => {
    const { submitFailed, sendSkjema } = this.props;
    const { institusjonsID, landKode, saksID } = this.state;

    if (submitFailed) return;

    const vaskedeVerdier = {
      ...values, institusjonsID, landKode, saksID,
    };
    delete vaskedeVerdier.fnrErGyldig;
    delete vaskedeVerdier.fnrErSjekket;
    sendSkjema(vaskedeVerdier);
  };

  overrideDefaultSubmit = event => {
    event.preventDefault();
  };

  validerFnr = erGyldig => {
    const { validerFnrRiktig, validerFnrFeil, settFnrGyldighet } = this.props;
    if (erGyldig) {
      validerFnrRiktig();
      settFnrGyldighet(true);
    } else {
      validerFnrFeil();
      settFnrGyldighet(false);
    }
  };

  erSedtyperGyldig = sedtyper => sedtyper && sedtyper.length > 0 && sedtyper[0];

  resettSokStatus = () => {
    const { settFnrGyldighet, settFnrSjekket } = this.props;
    settFnrGyldighet(null);
    settFnrSjekket(false);
  };

  openModal = () => {
    this.setState({ visModal: true });
  };

  closeModal = () => {
    this.setState({ visModal: false });
  };

  render() {
    const {
      serverInfo,
      landkoder, sedtyper, sektor, buctype, buctyper, temar,
      inntastetFnr, status, errdata,
      valgtSektor, sedtype,
      settFnrSjekket, settFnrGyldighet,
      fnrErGyldig, fnrErSjekket,
      opprettetSak,
    } = this.props;

    const { institusjoner, visModal } = this.state;

    const { rinasaksnummer, url: responsLenke } = opprettetSak;
    const vedleggRoute = `/vedlegg?rinasaksnummer=${rinasaksnummer}`;
    const { resettSokStatus, openModal, closeModal } = this;

    const erFagomroedeValgt = valgtSektor && valgtSektor.length > 0;
    const erBUCValgt = !_.isNil(buctype);
    const erSEDValgt = !_.isNil(sedtype);
    const erLandValgt = this.state.landKode.length > 0;
    const erMottakerInstitusjonValgt = this.state.institusjonsID.length > 0;
    const erFagsakValgt = this.state.saksID.length > 0;
    const redigerbart = erFagomroedeValgt && erBUCValgt && erSEDValgt && erLandValgt && erMottakerInstitusjonValgt && erFagsakValgt;

    const oppgittFnrErValidert = (fnrErGyldig && fnrErSjekket);
    return (
      <div className="opprettsak">
        <Nav.Systemtittel>Opprett Sak</Nav.Systemtittel>
        <form onSubmit={this.overrideDefaultSubmit}>
          <Nav.Container fluid>
            <Nav.Row className="">
              <Nav.Column xs="6">
                <PersonSok
                  inntastetFnr={inntastetFnr}
                  resettSokStatus={resettSokStatus}
                  settFnrSjekket={settFnrSjekket}
                  settFnrGyldighet={settFnrGyldighet}
                />
              </Nav.Column>
            </Nav.Row>
            <Nav.Row className="">
              <Nav.Column xs="3">
                <Skjema.Select id="id-sektor" feltNavn="sektor" label="Fagområde" bredde="xxl" disabled={!oppgittFnrErValidert}>
                  {sektor && sektor.concat().sort(sortBy('term')).map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
                </Skjema.Select>
              </Nav.Column>
            </Nav.Row>
            <Nav.Row className="">
              <Nav.Column xs="3">
                <Skjema.Select id="id-buctype" feltNavn="buctype" label="BUC" bredde="xxl" disabled={!oppgittFnrErValidert} onChange={this.oppdaterBucKode}>
                  {buctyper && buctyper.concat().sort(sortBy('kode')).map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
                </Skjema.Select>
              </Nav.Column>
              <Nav.Column xs="3">
                <Skjema.Select id="id-sedtype" feltNavn="sedtype" label="SED" bredde="xxl" disabled={!oppgittFnrErValidert}>
                  {this.erSedtyperGyldig(sedtyper) && sedtyper.map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
                </Skjema.Select>
              </Nav.Column>
            </Nav.Row>
            <Nav.Row className="">
              <Nav.Column xs="3">
                <Nav.Select id="id-landkode" bredde="xxl" disabled={!oppgittFnrErValidert} value={this.state.landKode} onChange={this.oppdaterLandKode} label="Land">
                  <option value="0" />
                  {landkoder && landkoder.concat().sort(sortBy('term')).map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
                </Nav.Select>
              </Nav.Column>
              <Nav.Column xs="3">
                <Nav.Select id="id-institusjon" bredde="xxl" disabled={!oppgittFnrErValidert} value={this.state.institusjonsID} onChange={this.oppdaterInstitusjonKode} label="Mottaker institusjon">
                  <option value="0" />
                  {institusjoner && institusjoner.concat().sort(sortBy('term')).map(element => <option value={element.institusjonsID} key={uuid()}>{element.navn}</option>)}
                </Nav.Select>
              </Nav.Column>
            </Nav.Row>
            <Nav.Row className="">
              {valgtSektor === 'FB' && <FamilieRelasjonsComponent />}
            </Nav.Row>
            {valgtSektor && (
              <Nav.Row className="">
                <Nav.Column xs="3">
                  <BehandlingsTemaer temaer={temar} tema={this.state.tema} oppdaterTemaListe={this.oppdaterTemaListe} />
                </Nav.Column>
                <Nav.Column xs="2">
                  <Nav.Knapp style={btnStyle} onClick={this.visFagsaker} disabled={this.state.tema.length === 0}>Vis saker</Nav.Knapp>
                </Nav.Column>
                <Nav.Column xs="2">
                  <Nav.Lenke href={serverInfo.gosysURL} ariaLabel="Opprett ny sak i GOSYS" target="_blank">
                    Opprett ny sak i GOSYS
                  </Nav.Lenke>
                </Nav.Column>
              </Nav.Row>
            )}

            {this.visFagsakerListe() &&
              <Fagsaker fagsaker={this.state.fagsaker} saksID={this.state.saksID} oppdaterFagsakListe={this.oppdaterFagsakListe} />
            }
            {this.visArbeidsforhold() &&
              <ArbeidsforholdController fnr={inntastetFnr} />
            }


            <Nav.Row className="opprettsak__statuslinje">
              <Nav.Column xs="3">
                <Nav.Hovedknapp
                  disabled={!redigerbart || ['PENDING'].includes(status)}
                  onClick={this.props.handleSubmit(this.skjemaSubmit)}
                  spinner={['PENDING'].includes(status)}>Opprett sak i RINA
                </Nav.Hovedknapp>
              </Nav.Column>
              <Nav.Column xs="3">
                <Nav.Flatknapp aria-label="Navigasjonslink tilbake til forsiden" onClick={() => openModal()} >
                  AVSLUTT UTFYLLING
                </Nav.Flatknapp>
              </Nav.Column>
            </Nav.Row>
            <Nav.Row>
              <Nav.Column xs="6">
                <StatusLinje status={status} tittel={`Saksnummer: ${rinasaksnummer}`} rinaURL={responsLenke} routePath={vedleggRoute} />
                {errdata && errdata.status && <p>{errdata.message}</p>}
              </Nav.Column>
            </Nav.Row>
          </Nav.Container>
        </form>
        <AvsluttModal
          visModal={visModal}
          closeModal={closeModal}
        />
      </div>
    );
  }
}
OpprettSak.propTypes = {
  serverInfo: MPT.ServerInfo.isRequired,
  validerFnrRiktig: PT.func.isRequired,
  validerFnrFeil: PT.func.isRequired,
  handleSubmit: PT.func.isRequired,
  sendSkjema: PT.func.isRequired,
  settFnrGyldighet: PT.func.isRequired,
  settFnrSjekket: PT.func.isRequired,
  settBuctype: PT.func.isRequired,
  hentLandkoder: PT.func.isRequired,
  submitFailed: PT.bool.isRequired,
  landkoder: PT.arrayOf(MPT.Kodeverk),
  sedtyper: PT.arrayOf(MPT.Kodeverk),
  sedtype: PT.string,
  sektor: PT.arrayOf(MPT.Kodeverk),
  temar: PT.arrayOf(MPT.Kodeverk),
  buctyper: PT.arrayOf(MPT.Kodeverk),
  buctype: PT.string,
  fnrErGyldig: PT.bool,
  fnrErSjekket: PT.bool,
  inntastetFnr: PT.string,
  valgtSektor: PT.string,
  status: PT.string,
  errdata: PT.object,
  valgteFamilieRelasjoner: PT.arrayOf(PT.shape({
    rolle: PT.string,
    fnr: PT.string,
    fdato: PT.string,
    fornavn: PT.string,
    etternavn: PT.string,
    kjoenn: PT.string,
    nasjonalitet: PT.string,
  })),
  opprettetSak: PT.shape({
    rinasaksnummer: PT.string,
    url: PT.string,
  }),
};

OpprettSak.defaultProps = {
  landkoder: undefined,
  sedtyper: undefined,
  sedtype: undefined,
  sektor: undefined,
  temar: undefined,
  buctyper: undefined,
  buctype: undefined,
  fnrErGyldig: undefined,
  fnrErSjekket: undefined,
  inntastetFnr: '',
  valgtSektor: '',
  status: '',
  errdata: {},
  valgteFamilieRelasjoner: [],
  opprettetSak: {},
};

const skjemaSelector = formValueSelector('opprettSak');

const mapStateToProps = state => ({
  initialValues: {
    tilleggsopplysninger: {
      familierelasjoner: [],
      arbeidsforhold: [],
    },
  },
  serverInfo: ServerinfoSelectors.ServerinfoSelector(state),
  landkoder: LandkoderSelectors.landkoderSelector(state),
  sektor: KodeverkSelectors.sektorSelector(state),
  fnrErGyldig: skjemaSelector(state, 'fnrErGyldig'),
  fnrErSjekket: skjemaSelector(state, 'fnrErSjekket'),
  sedtyper: RinasakSelectors.sedtyperSelector(state),
  sedtype: skjemaSelector(state, 'sedtype'),
  buctype: skjemaSelector(state, 'buctype'),
  buctyper: RinasakSelectors.buctyperSelector(state),
  temar: FagsakSelectors.temaSelector(state),
  inntastetFnr: skjemaSelector(state, 'fnr'),
  valgtSektor: skjemaSelector(state, 'sektor'),
  valgteFamilieRelasjoner: skjemaSelector(state, 'tilleggsopplysninger.familierelasjoner'),
  valgteArbeidsforhold: skjemaSelector(state, 'tilleggsopplysninger.arbeidsforhold'),
  status: RinasakSelectors.sakStatusSelector(state),
  errdata: RinasakSelectors.errorDataSakSelector(state),
  opprettetSak: RinasakSelectors.sakSelector(state),
  fagsaker: FagsakSelectors.fagsakerSelector(state),
});

const mapDispatchToProps = dispatch => ({
  validerFnrFeil: () => dispatch(stopSubmit('opprettSak', { fnr: 'Fant ingen treff på søket.' })),
  validerFnrRiktig: () => dispatch(clearAsyncError('opprettSak', 'fnr')),
  settFnrGyldighet: erGyldig => dispatch(change('opprettSak', 'fnrErGyldig', erGyldig)),
  settFnrSjekket: erSjekket => dispatch(change('opprettSak', 'fnrErSjekket', erSjekket)),
  settBuctype: buctype => dispatch(change('opprettSak', 'buctype', buctype)),
  sendSkjema: data => dispatch(RinasakOperations.sendSak(data)),
  hentLandkoder: buctype => dispatch(LandkoderOperations.hent(buctype)),
});

const validering = values => {
  // const { fnr, sektor, sedtype, land, institusjonsID } = values;
  const fnrValidNumberMsg = _.isNumber(values.fnr) ? 'Du må taste inn fødselsnummer.' : null;
  // const fnrErUgyldig = (values.fnrErGyldig === false && values.fnrErSjekket) ? 'Fødselsnummeret er ikke gyldig.' : null;
  const sektor = !values.sektor ? 'Du må velge sektor.' : null;
  const buctype = !values.buctype ? 'Du må velge buctype.' : null;
  const sedtype = !values.sedtype ? 'Du må velge sedtype.' : null;
  const land = !values.land ? 'Du må velge land.' : null;
  const institusjonsID = !values.institusjonsID ? 'Du må velge institusjon.' : null;

  return {
    fnr: fnrValidNumberMsg, // || fnrErUgyldig,
    sektor,
    buctype,
    sedtype,
    land,
    institusjonsID,
  };
};

// mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'opprettSak',
  onSubmit: () => {},
  validate: validering,
})(OpprettSak));
