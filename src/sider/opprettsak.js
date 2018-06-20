import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, clearAsyncError, stopSubmit, change, FieldArray } from 'redux-form';
import PT from 'prop-types';

import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';

import { StatusLinje } from '../felles-komponenter/statuslinje';
import { KodeverkSelectors } from '../ducks/kodeverk';
import PersonSok from './personsok';
import { eusakOperations, eusakSelectors } from '../ducks/eusak';

import './opprettsak.css';

const uuid = require('uuid/v4');

const FamilieRelasjon = ({ relasjon, slettRelasjon }) => (
  <div>
    <dl>
      <dt>FamilieRelasjon</dt><dd>{relasjon.relasjon}</dd>
      <dt>Fødselsnummmer</dt><dd>{relasjon.fnr}</dd>
    </dl>
    <button onClick={() => slettRelasjon(relasjon.fnr)} >slett</button>
  </div>
);

FamilieRelasjon.propTypes = {
  relasjon: PT.object.isRequired,
  slettRelasjon: PT.func.isRequired,
};

class CustomFamilieRelasjoner extends Component {
  state = { fnr: '', relasjon: ''};

  leggTilRelasjon = () => {
    const { fields } = this.props;
    const relasjon = { fnr: this.state.fnr, relasjon: this.state.relasjon };
    fields.push(relasjon);
  }

  oppdaterState = (felt, event) => {
    const { value } = event.currentTarget;
    this.setState({ [felt]: value });
  }

  slettRelasjon = fnr => {
    const index = this.props.fields.getAll().findIndex(relasjon => relasjon.fnr === fnr);
    this.props.fields.remove(index);
  }

  render() {
    const { tilleggsopplysninger, familierelasjoner, fields } = this.props;
    const relasjoner = fields.getAll();

    console.log(relasjoner);
    console.log('state', this.state);

    return (
      <div>
        {relasjoner && relasjoner.map(relasjon => <FamilieRelasjon key={uuid()} relasjon={relasjon} slettRelasjon={this.slettRelasjon} />)}
        <Nav.Input feltNavn="familie_fnr" label="Fødsels- eller d-nummer" bredde="S" value={this.state.fnr} onChange={event => this.oppdaterState('fnr', event)} />
        <Nav.Select feltNavn="familierelasjon" label="Familierelasjon" bredde="s" value={this.state.relasjon} onChange={event => this.oppdaterState('relasjon', event)}>
          <option value='' disabled>- velg -</option>
          {familierelasjoner && familierelasjoner.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
        </Nav.Select>
        <button onClick={this.leggTilRelasjon}>Legg til</button>
      </div>
    );
  }
}

CustomFamilieRelasjoner.propTypes = {
  fields: PT.object.isRequired,
}

const TilleggsOpplysninger = props => (
  <FieldArray name="familierelasjon" component={CustomFamilieRelasjoner} props={props} />
);


class OpprettSak extends Component {
  skjemaSubmit = values => {
    const { submitFailed, sendSkjema } = this.props;
    if (submitFailed) return;

    const vaskedeVerdier = { ...values };
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

  render() {
    const {
      familierelasjoner, landkoder, sedtyper, sector, buctyper,
      inntastetFnr, status,
      settFnrGyldighet, settFnrSjekket,
    } = this.props;
    const tilleggsopplysninger = [{
      fnr: '02026100715',
      sammensattNavn: 'BLYANT STOR',
      relasjon: 'sonn',
    }];
    return (
      <div className="opprettsak">
        <form onSubmit={this.overrideDefaultSubmit}>
          <Nav.Container fluid>
            <Nav.Row>
              <Nav.Column xs="6">
                <PersonSok inntastetFnr={inntastetFnr} settFnrGyldighet={settFnrGyldighet} settFnrSjekket={settFnrSjekket} />
              </Nav.Column>
            </Nav.Row>
            <Nav.Row>
              <Nav.Column xs="12">
                <div>
                  <Nav.Fieldset legend="Fagområde">
                    <Skjema.Select feltNavn="sector" label="Velg Fagområde" bredde="xl">
                      {sector && sector.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
                    </Skjema.Select>
                  </Nav.Fieldset>
                  <Nav.Fieldset legend="Type BUC">
                    <Skjema.Select feltNavn="buctype" label="Velg BUC Type" bredde="xxl">
                      {buctyper && buctyper.map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
                    </Skjema.Select>
                  </Nav.Fieldset>
                  <Nav.Fieldset legend="Type SED">
                    <Skjema.Select feltNavn="sedtype" label="Velg SED Type" bredde="xl">
                      {sedtyper && sedtyper.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
                    </Skjema.Select>
                  </Nav.Fieldset>
                  <Nav.Fieldset legend="Land">
                    <Skjema.Select feltNavn="land" label="Velg Land" bredde="s">
                      {landkoder && landkoder.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
                    </Skjema.Select>
                  </Nav.Fieldset>
                  <Nav.Fieldset legend="Mottaker institusjon">
                    <Skjema.Input feltNavn="institusjon" label="InstitusjonID" bredde="S" />
                  </Nav.Fieldset>
                </div>
                <Nav.Fieldset legend="Tilleggsopplysninger">
                  <TilleggsOpplysninger familierelasjoner={familierelasjoner} tilleggsopplysninger={tilleggsopplysninger} />
                </Nav.Fieldset>
                <Nav.Knapp onClick={this.props.handleSubmit(this.skjemaSubmit)}>Opprett sak i RINA</Nav.Knapp>
                <StatusLinje status={status} tittel="Opprettet sak" />
              </Nav.Column>
            </Nav.Row>
          </Nav.Container>
        </form>
      </div>
    );
  }
}
OpprettSak.propTypes = {
  validerFnrRiktig: PT.func.isRequired,
  validerFnrFeil: PT.func.isRequired,
  handleSubmit: PT.func.isRequired,
  sendSkjema: PT.func.isRequired,
  settFnrGyldighet: PT.func.isRequired,
  settFnrSjekket: PT.func.isRequired,
  submitFailed: PT.bool.isRequired,
  familierelasjoner: PT.arrayOf(MPT.Kodeverk),
  landkoder: PT.arrayOf(MPT.Kodeverk),
  sedtyper: PT.arrayOf(MPT.Kodeverk),
  sector: PT.arrayOf(MPT.Kodeverk),
  buctyper: PT.arrayOf(MPT.Kodeverk),
  inntastetFnr: PT.string,
  status: PT.string,
};

OpprettSak.defaultProps = {
  familierelasjoner: undefined,
  landkoder: undefined,
  sedtyper: undefined,
  sector: undefined,
  buctyper: undefined,
  inntastetFnr: '',
  status: '',
};

const skjemaSelector = formValueSelector('opprettSak');

const mapStateToProps = state => ({
  familierelasjoner: KodeverkSelectors.familierelasjonerSelector(state),
  landkoder: KodeverkSelectors.landkoderSelector(state),
  sedtyper: KodeverkSelectors.sedtyperSelector(state),
  sector: KodeverkSelectors.sectorSelector(state),
  buctyper: KodeverkSelectors.buctyperSelector(state),
  inntastetFnr: skjemaSelector(state, 'fnr'),
  status: eusakSelectors.EusakStatusSelector(state),
});

const mapDispatchToProps = dispatch => ({
  validerFnrFeil: () => dispatch(stopSubmit('opprettSak', { fnr: 'Fant ingen treff på søket.' })),
  validerFnrRiktig: () => dispatch(clearAsyncError('opprettSak', 'fnr')),
  settFnrGyldighet: erGyldig => dispatch(change('opprettSak', 'fnrErGyldig', erGyldig)),
  settFnrSjekket: erSjekket => dispatch(change('opprettSak', 'fnrErSjekket', erSjekket)),
  sendSkjema: data => dispatch(eusakOperations.send(data)),
});

const validering = values => {
  const fnr = !values.fnr ? 'Du må taste inn fødselsnummer.' : null;
  const fnrSokPaminnelse = !values.fnrErSjekket ? 'Husk å søke opp fødselsnummeret først.' : null;
  const fnrErUgyldig = !values.fnrErGyldig ? 'Fødselsnummeret er ikke gyldig.' : null;
  const sector = !values.sector ? 'Du må velge sektor.' : null;
  const buctype = !values.buctype ? 'Du må velge buctype.' : null;
  const sedtype = !values.sedtype ? 'Du må velge sedtype.' : null;
  const land = !values.land ? 'Du må velge land.' : null;
  const institusjon = !values.institusjon ? 'Du må velge institusjon.' : null;

  return {
    fnr: fnr || fnrSokPaminnelse || fnrErUgyldig,
    sector,
    buctype,
    sedtype,
    land,
    institusjon,
  };
};

// mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'opprettSak',
  onSubmit: () => {},
  validate: validering,
})(OpprettSak));
