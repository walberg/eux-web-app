/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change } from 'redux-form';

import PT from 'prop-types';

import { RinasakSelectors } from '../ducks/rinasak';
import { KodeverkSelectors } from '../ducks/kodeverk';
import { LandkoderOperations, LandkoderSelectors } from '../ducks/landkoder';
import { InstitusjonerOperations, InstitusjonerSelectors } from '../ducks/institusjoner';
import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';

const uuid = require('uuid/v4');

class Fagomrade extends Component {
  erSedtyperGyldig = sedtyper => sedtyper && sedtyper.length > 0 && sedtyper[0];

  oppdaterBucKode = async event => {
    const { settBuctype, hentLandkoder } = this.props;
    const buctype = event.target.value;
    await settBuctype(buctype);
    await hentLandkoder(buctype);
  };

  oppdaterLandKode = async event => {
    const { settLandkode, buctype, hentInstitusjoner } = this.props;
    const landkode = event.target.value;
    await settLandkode(landkode);
    await hentInstitusjoner(buctype, landkode);
  };

  render() {
    const {
      sektor, fnrErGyldig, fnrErSjekket, buctyper, sedtyper, landkoder, institusjoner,
    } = this.props;
    const oppgittFnrErValidert = (fnrErGyldig && fnrErSjekket);
    return (
      <Nav.Container fluid>
        <Nav.Row className="">
          <Nav.Column xs="3">
            <Skjema.Select id="id-sektor" feltNavn="sektor" label="Fagområde" bredde="xxl" disabled={!oppgittFnrErValidert}>
              {sektor && sektor.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
        </Nav.Row>
        <Nav.Row className="">
          <Nav.Column xs="3">
            <Skjema.Select id="id-buctype" feltNavn="buctype" label="BUC" bredde="xxl" disabled={!oppgittFnrErValidert} onChange={this.oppdaterBucKode}>
              {buctyper && buctyper.map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
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
            <Skjema.Select id="id-landkode" feltNavn="landkode" label="Land" bredde="xxl" disabled={!oppgittFnrErValidert} onChange={this.oppdaterLandKode}>
              {/* <option value="0" /> */}
              {landkoder && landkoder.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
          <Nav.Column xs="3">
            <Skjema.Select id="id-institusjon" feltNavn="institusjoner" bredde="xxl" disabled={!oppgittFnrErValidert} label="Mottaker institusjon">
              <option value="0" />
              {institusjoner && institusjoner.map(element => <option value={element.institusjonsID} key={uuid()}>{element.navn}</option>)}
            </Skjema.Select>
          </Nav.Column>
        </Nav.Row>
      </Nav.Container>
    );
  }
}

Fagomrade.propTypes = {
  settLandkode: PT.func.isRequired,
  settBuctype: PT.func.isRequired,
  hentLandkoder: PT.func.isRequired,
  hentInstitusjoner: PT.func.isRequired,
  sektor: PT.arrayOf(MPT.Kodeverk),
  buctyper: PT.arrayOf(MPT.Kodeverk),
  sedtyper: PT.arrayOf(MPT.Kodeverk),
  landkoder: PT.arrayOf(MPT.Kodeverk),
  institusjoner: PT.arrayOf(MPT.Kodeverk),
  fnrErGyldig: PT.bool,
  fnrErSjekket: PT.bool,
  buctype: PT.string,
  landkode: PT.string,
};

Fagomrade.defaultProps = {
  buctype: undefined,
  landkoder: undefined,
  landkode: undefined,
  sektor: undefined,
  fnrErGyldig: undefined,
  fnrErSjekket: undefined,
  buctyper: undefined,
  sedtyper: undefined,
  institusjoner: undefined,
};

const skjemaSelector = formValueSelector('opprettSak');

const mapStateToProps = state => ({
  institusjoner: InstitusjonerSelectors.institusjonerSelector(state),
  landkoder: LandkoderSelectors.landkoderSelector(state),
  sektor: KodeverkSelectors.sektorSelector(state),
  fnrErGyldig: skjemaSelector(state, 'fnrErGyldig'),
  fnrErSjekket: skjemaSelector(state, 'fnrErSjekket'),
  sedtyper: RinasakSelectors.sedtyperSelector(state),
  sedtype: skjemaSelector(state, 'sedtype'),
  buctype: skjemaSelector(state, 'buctype'),
  landkode: skjemaSelector(state, 'landkode'),
  buctyper: RinasakSelectors.buctyperSelector(state),
});
const mapDispatchToProps = dispatch => ({
  settBuctype: buctype => dispatch(change('opprettSak', 'buctype', buctype)),
  settLandkode: landkode => dispatch(change('opprettSak', 'landkode', landkode)),
  hentLandkoder: buctype => dispatch(LandkoderOperations.hent(buctype)),
  hentInstitusjoner: (buctype, landkode) => dispatch(InstitusjonerOperations.hent(buctype, landkode)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Fagomrade);
