import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, change } from 'redux-form';
import PT from 'prop-types';
import * as Nav from '../utils/navFrontend';
import DokumentSok from './dokumentsok';
import PersonSok from './personsok';
import { Arbeidsforhold } from './sak';
import { StatusLinje } from '../felles-komponenter/statuslinje';

import './opprettsed.css';
import { RinasedOperations, RinasedSelectors } from '../ducks/rinased';

class OpprettSed extends Component {
  overrideDefaultSubmit = event => {
    event.preventDefault();
  };
  resettSokStatus = () => {
    const { settFnrGyldighet, settFnrSjekket } = this.props;
    settFnrGyldighet(null);
    settFnrSjekket(false);
  };

  skjemaSubmit = values => {
    // console.log(values);
    const { sendSkjema } = this.props;

    // if (submitFailed) return;

    sendSkjema(values);
  };
  render() {
    const {
      inntastetRinasaksnummer, settRinaGyldighet, settRinaSjekket,
      inntastetFnr, settFnrSjekket, settFnrGyldighet,
      status, errdata,
    } = this.props;
    return (
      <div className="opprettsed">
        <Nav.Systemtittel>Opprett SED</Nav.Systemtittel>
        <form onSubmit={this.overrideDefaultSubmit}>
          <Nav.Container fluid>
            <Nav.Row className="">
              <DokumentSok
                inntastetRinasaksnummer={inntastetRinasaksnummer}
                settRinaGyldighet={settRinaGyldighet}
                settRinaSjekket={settRinaSjekket}
              />
            </Nav.Row>
            <Nav.Row>
              <Nav.Column>
                <PersonSok
                  inntastetFnr={inntastetFnr}
                  resettSokStatus={this.resettSokStatus}
                  settFnrSjekket={settFnrSjekket}
                  settFnrGyldighet={settFnrGyldighet}
                />
              </Nav.Column>
            </Nav.Row>
            <Arbeidsforhold fnr={inntastetFnr} />
            <Nav.Row className="opprettsak__statuslinje">
              <Nav.Column xs="3">
                <Nav.Hovedknapp onClick={this.props.handleSubmit(this.skjemaSubmit)}>Opprett SED</Nav.Hovedknapp>
              </Nav.Column>
              <Nav.Column xs="2">
                <Nav.Lenke href="/" ariaLabel="Navigasjonslink tilbake til forsiden">
                  AVSLUTT
                </Nav.Lenke>
              </Nav.Column>
            </Nav.Row>
            <Nav.Row>
              <Nav.Column>
                <StatusLinje status={status} url="#" tittel="Saksnummer:" />
                {errdata && errdata.status && <p>{errdata.message}</p>}
              </Nav.Column>
            </Nav.Row>
          </Nav.Container>
        </form>
      </div>
    );
  }
}
OpprettSed.propTypes = {
  rinasaksnummer: PT.string,
  inntastetRinasaksnummer: PT.string,
  rinadokumentID: PT.string,
  handleSubmit: PT.func.isRequired,
  submitFailed: PT.bool.isRequired,
  sendSkjema: PT.func.isRequired,
  settRinaGyldighet: PT.func.isRequired,
  settRinaSjekket: PT.func.isRequired,
  inntastetFnr: PT.string,
  settFnrSjekket: PT.func.isRequired,
  settFnrGyldighet: PT.func.isRequired,
  status: PT.string,
  errdata: PT.object,
};
OpprettSed.defaultProps = {
  rinasaksnummer: '',
  inntastetRinasaksnummer: '',
  rinadokumentID: '',
  inntastetFnr: '',
  status: '',
  errdata: {},

};

const skjemaSelector = formValueSelector('opprettSED');

const mapStateToProps = state => ({
  initialValues: {
    tilleggsopplysninger: {
      arbeidsgivere: [],
    },
  },
  status: RinasedSelectors.sedStatusSelector(state),
  errdata: RinasedSelectors.errorDataSedSelector(state),
  valgteArbeidsgivere: skjemaSelector(state, 'tilleggsopplysninger.arbeidsgivere'),
  inntastetRinasaksnummer: skjemaSelector(state, 'rinasaksnummer'),
  inntastetFnr: skjemaSelector(state, 'fnr'),
});

const mapDispatchToProps = dispatch => ({
  settRinaGyldighet: erGyldig => dispatch(change('opprettSED', 'rinaNrErGyldig', erGyldig)),
  settRinaSjekket: erSjekket => dispatch(change('opprettSED', 'rinaNrErSjekket', erSjekket)),
  settFnrSjekket: erSjekket => dispatch(change('opprettSED', 'fnrErSjekket', erSjekket)),
  settFnrGyldighet: erGyldig => dispatch(change('opprettSED', 'fnrErGyldig', erGyldig)),
  sendSkjema: data => dispatch(RinasedOperations.sendSak(data)),
});
const validering = values => {
  const fnr = !values.fnr ? 'Du må taste inn fødselsnummer.' : null;
  const fnrErUgyldig = (values.fnrErGyldig === false && values.fnrErSjekket) ? 'Fødselsnummeret er ikke gyldig.' : null;
  const rinasaksnummer = !values.rinasaksnummer ? 'Du må taste inn et RINA saksnummer' : null;
  return {
    fnr: fnr || fnrErUgyldig,
    rinasaksnummer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'opprettSED',
  onSubmit: () => {},
  validate: validering,
})(OpprettSed));
