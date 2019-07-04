import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, clearAsyncError, stopSubmit, change } from 'redux-form';
import PT from 'prop-types';

import * as Api from '../services/api';
import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';

import { FagsakSelectors } from '../ducks/fagsak';
import { KodeverkSelectors } from '../ducks/kodeverk';
import { RinasakOperations, RinasakSelectors } from '../ducks/rinasak';
import { ServerinfoSelectors } from '../ducks/serverinfo';
import { StatusLinje } from '../felles-komponenter/statuslinje';
import FamilieRelasjonsComponent from '../felles-komponenter/skjema/PersonOgFamilieRelasjoner';
import PersonSok from './personsok';
import Fagomrade from '../komponenter/Fagomrade';


import './opprettsak.css';
import { ArbeidsforholdController, BehandlingsTemaer, Fagsaker } from './sak';
import { PersonSelectors } from '../ducks/person';

const btnStyle = {
  margin: '1.85em 0 0 0',
};

class OpprettSak extends Component {
  state = {
    tema: '',
    fagsaker: [],
    soktEtterSaker: false,
    saksID: '',
  };

  visFagsakerListe = () => (['FB', 'UB'].includes(this.props.valgtSektor) && this.state.tema.length > 0 && this.state.soktEtterSaker);
  visArbeidsforhold = () => {
    const { valgtSektor, buctype, sedtype } = this.props;
    return ['FB'].includes(valgtSektor) && ['FB_BUC_01'].includes(buctype) && sedtype;
  };

  oppdaterTemaListe = event => {
    const tema = event.target.value;
    this.setState({ tema, fagsaker: [], soktEtterSaker: false });
  };

  oppdaterFagsakListe = event => {
    const saksID = event.target.value;
    this.setState({ saksID });
  };
  hentFagsaker = async () => {
    const { tema } = this.state;
    const { fnr, valgtSektor } = this.props;
    const fagsaker = await Api.Fagsaker.hent(fnr, valgtSektor, tema);
    this.setState({ fagsaker, soktEtterSaker: true });
  };

  skjemaSubmit = values => {
    const { submitFailed, sendSkjema } = this.props;
    const { saksID } = this.state;

    if (submitFailed) return;

    const vaskedeVerdier = {
      ...values, saksID,
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

  resettSokStatus = () => {
    const { settFnrGyldighet, settFnrSjekket } = this.props;
    settFnrGyldighet(null);
    settFnrSjekket(false);
  };

  render() {
    const {
      serverInfo, temar, inntastetFnr, status, errdata, valgtSektor, settFnrSjekket, settFnrGyldighet, opprettetSak,
    } = this.props;
    const { rinasaksnummer, url: responsLenke } = opprettetSak;
    const vedleggRoute = `/vedlegg?rinasaksnummer=${rinasaksnummer}`;
    const { resettSokStatus } = this;

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
            <Fagomrade />
            <Nav.Row className="">
              {valgtSektor === 'FB' && <FamilieRelasjonsComponent />}
            </Nav.Row>
            {['FB', 'UB'].includes(valgtSektor) && (
              <Nav.Row className="">
                <Nav.Column xs="3">
                  <BehandlingsTemaer temaer={temar} tema={this.state.tema} oppdaterTemaListe={this.oppdaterTemaListe} />
                </Nav.Column>
                <Nav.Column xs="2">
                  <Nav.Knapp style={btnStyle} onClick={this.hentFagsaker} disabled={this.state.tema.length === 0}>Vis saker</Nav.Knapp>
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
                <Nav.Hovedknapp onClick={this.props.handleSubmit(this.skjemaSubmit)} spinner={['PENDING'].includes(status)} disabled={['PENDING'].includes(status)}>Opprett sak i RINA</Nav.Hovedknapp>
              </Nav.Column>
              <Nav.Column xs="2">
                <Nav.Lenke href="/" ariaLabel="Navigasjonslink tilbake til forsiden">
                  AVSLUTT
                </Nav.Lenke>
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
  submitFailed: PT.bool.isRequired,
  sedtype: PT.string,
  sektor: PT.arrayOf(MPT.Kodeverk),
  temar: PT.arrayOf(MPT.Kodeverk),
  buctype: PT.string,
  fnrErGyldig: PT.bool,
  fnrErSjekket: PT.bool,
  inntastetFnr: PT.string,
  valgtSektor: PT.string,
  status: PT.string,
  errdata: PT.object,
  valgteFamilieRelasjoner: PT.array,
  opprettetSak: PT.shape({
    rinasaksnummer: PT.string,
    url: PT.string,
  }),
  fnr: PT.string,
};

OpprettSak.defaultProps = {
  sedtype: undefined,
  sektor: undefined,
  temar: undefined,
  buctype: undefined,
  fnrErGyldig: undefined,
  fnrErSjekket: undefined,
  inntastetFnr: '',
  valgtSektor: '',
  status: '',
  errdata: {},
  valgteFamilieRelasjoner: [],
  opprettetSak: {},
  fnr: '',
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
  sektor: KodeverkSelectors.sektorSelector(state),
  fnrErGyldig: skjemaSelector(state, 'fnrErGyldig'),
  fnrErSjekket: skjemaSelector(state, 'fnrErSjekket'),
  sedtype: skjemaSelector(state, 'sedtype'),
  buctype: skjemaSelector(state, 'buctype'),
  temar: FagsakSelectors.temaSelector(state),
  inntastetFnr: skjemaSelector(state, 'fnr'),
  valgtSektor: skjemaSelector(state, 'sektor'),
  valgteFamilieRelasjoner: skjemaSelector(state, 'tilleggsopplysninger.familierelasjoner'),
  valgteArbeidsforhold: skjemaSelector(state, 'tilleggsopplysninger.arbeidsforhold'),
  status: RinasakSelectors.sakStatusSelector(state),
  errdata: RinasakSelectors.errorDataSakSelector(state),
  opprettetSak: RinasakSelectors.sakSelector(state),
  fagsaker: FagsakSelectors.fagsakerSelector(state),
  fnr: PersonSelectors.fnrSelector(state),
});

const mapDispatchToProps = dispatch => ({
  validerFnrFeil: () => dispatch(stopSubmit('opprettSak', { fnr: 'Fant ingen treff på søket.' })),
  validerFnrRiktig: () => dispatch(clearAsyncError('opprettSak', 'fnr')),
  settFnrGyldighet: erGyldig => dispatch(change('opprettSak', 'fnrErGyldig', erGyldig)),
  settFnrSjekket: erSjekket => dispatch(change('opprettSak', 'fnrErSjekket', erSjekket)),
  sendSkjema: data => dispatch(RinasakOperations.sendSak(data)),
});

const validering = values => {
  const fnr = !values.fnr ? 'Du må taste inn fødselsnummer.' : null;
  const fnrErUgyldig = (values.fnrErGyldig === false && values.fnrErSjekket) ? 'Fødselsnummeret er ikke gyldig.' : null;
  const sektor = !values.sektor ? 'Du må velge sektor.' : null;
  const buctype = !values.buctype ? 'Du må velge buctype.' : null;
  const sedtype = !values.sedtype ? 'Du må velge sedtype.' : null;
  const landKode = !values.landKode ? 'Du må velge land.' : null;
  const institusjonsID = !values.institusjonsID ? 'Du må velge institusjon.' : null;

  return {
    fnr: fnr || fnrErUgyldig,
    sektor,
    buctype,
    sedtype,
    landKode,
    institusjonsID,
  };
};

// mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'opprettSak',
  onSubmit: () => { },
  validate: validering,
})(OpprettSak));
