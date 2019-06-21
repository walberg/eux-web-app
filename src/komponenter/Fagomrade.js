import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formValueSelector, change, clearFields } from 'redux-form';
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

  /**
   * Nullstiller felter i skjema ved ny valg av ny sektor
   */
  oppdaterSektor = event => {
    const { nullstillSkjemaFelter, settSektor } = this.props;
    const sektor = event.target.value;
    settSektor(sektor);
    nullstillSkjemaFelter(['buctype', 'sedtype', 'landkode', 'institusjoner']);
  }

  /**
   * Landkoder er avhengig av valgt buc, derfor må disse hentes her
   */
  oppdaterBucKode = async event => {
    const { settBuctype, hentLandkoder } = this.props;
    const buctype = event.target.value;
    await settBuctype(buctype);
    await hentLandkoder(buctype);
  };

  /**
   * Institusjoner er avhengig av valgt landkode og buctype, derfor må disse hentes her
   */
  oppdaterLandKode = async event => {
    const { settLandkode, buctype, hentInstitusjoner } = this.props;
    const landkode = event.target.value;
    await settLandkode(landkode);
    await hentInstitusjoner(buctype, landkode);
  };

  render() {
    const {
      sektor, fnrErGyldig, fnrErSjekket, buctyper, sedtyper, landkoder, institusjoner, valgtSektor, buctype, sedtype, landkode,
    } = this.props;
    const oppgittFnrErValidert = (fnrErGyldig && fnrErSjekket);
    return (
      <div>
        <Nav.Row className="">
          <Nav.Column xs="3">
            <Skjema.Select id="id-sektor" feltNavn="sektor" label="Fagområde" bredde="xxl" disabled={!oppgittFnrErValidert} onChange={this.oppdaterSektor}>
              {sektor && sektor.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
        </Nav.Row>
        <Nav.Row className="">
          <Nav.Column xs="3">
            <Skjema.Select id="id-buctype" feltNavn="buctype" label="BUC" bredde="xxl" disabled={!valgtSektor} onChange={this.oppdaterBucKode}>
              {buctyper && buctyper.map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
          <Nav.Column xs="3">
            <Skjema.Select id="id-sedtype" feltNavn="sedtype" label="SED" bredde="xxl" disabled={!buctype}>
              {this.erSedtyperGyldig(sedtyper) && sedtyper.map(element => <option value={element.kode} key={uuid()}>{element.kode}-{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
        </Nav.Row>
        <Nav.Row className="">
          <Nav.Column xs="3">
            <Skjema.Select id="id-landkode" feltNavn="landKode" label="Land" bredde="xxl" disabled={!sedtype} onChange={this.oppdaterLandKode}>
              {landkoder && landkoder.map(element => <option value={element.kode} key={uuid()}>{element.term}</option>)}
            </Skjema.Select>
          </Nav.Column>
          <Nav.Column xs="3">
            <Skjema.Select id="id-institusjonsID" feltNavn="institusjonsID" bredde="xxl" disabled={!landkode} label="Mottaker institusjon">
              {institusjoner && institusjoner.map(element => <option value={element.institusjonsID} key={uuid()}>{element.navn}</option>)}
            </Skjema.Select>
          </Nav.Column>
        </Nav.Row>
      </div>
    );
  }
}

Fagomrade.propTypes = {
  nullstillSkjemaFelter: PT.func.isRequired,
  settSektor: PT.func.isRequired,
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
  valgtSektor: PT.string,
  buctype: PT.string,
  landkode: PT.string,
  sedtype: PT.string,
};

Fagomrade.defaultProps = {
  valgtSektor: undefined,
  buctype: undefined,
  sedtype: undefined,
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
  valgtSektor: skjemaSelector(state, 'sektor'),
  sedtype: skjemaSelector(state, 'sedtype'),
  buctype: skjemaSelector(state, 'buctype'),
  landkode: skjemaSelector(state, 'landKode'),
  buctyper: RinasakSelectors.buctyperSelector(state),
});

const mapDispatchToProps = dispatch => ({
  settSektor: sektor => dispatch(change('opprettSak', 'sektor', sektor)),
  settBuctype: buctype => dispatch(change('opprettSak', 'buctype', buctype)),
  settLandkode: landkode => dispatch(change('opprettSak', 'landKode', landkode)),
  hentLandkoder: buctype => dispatch(LandkoderOperations.hent(buctype)),
  hentInstitusjoner: (buctype, landkode) => dispatch(InstitusjonerOperations.hent(buctype, landkode)),
  nullstillSkjemaFelter: felter => dispatch(clearFields('opprettSak', false, false, ...felter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Fagomrade);
