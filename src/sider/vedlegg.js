import React, { Component } from 'react';
import PT from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as Skjema from '../felles-komponenter/skjema';
import * as Nav from '../utils/navFrontend';

import { vedleggOperations, vedleggSelectors } from '../ducks/vedlegg';

import './vedlegg.css';

const StatusLinje = ({ status }) => {
  if (status === 'NOT_STARTED') {
    return null;
  }
  return (
    <div className="vedlegg__status">
      <h3>{status}</h3>
    </div>
  );
};
StatusLinje.propTypes = {
  status: PT.string.isRequired,
};

class Vedlegg extends Component {
  render() {
    const {
      handleSubmit, sendSkjema, vedleggStatus, vedlegg,
    } = this.props;

    return (
      <div className="vedlegg">
        <Nav.Container fluid>
          <form onSubmit={handleSubmit(sendSkjema)}>
            <Nav.Row>
              <Nav.Column xs="6">
                <Nav.Panel className="vedlegg__skjema">
                  <Nav.Fieldset legend="Vedleggs informasjon">
                    <Nav.HjelpetekstBase id="journalPostID" type="under">Journalpost ID finner du i Gosys</Nav.HjelpetekstBase>
                    <Skjema.Input feltNavn="journalpostID" label="JournalpostID" />
                    <Nav.HjelpetekstBase id="dokumentID" type="under">Dokument ID finner du i Gosys</Nav.HjelpetekstBase>
                    <Skjema.Input feltNavn="dokumentID" label="DokumentID" />
                    <Nav.HjelpetekstBase id="saksnummer" type="under">Saksnummer finner du i RINA</Nav.HjelpetekstBase>
                    <Skjema.Input feltNavn="saksnummer" label="RINA Saksnummer" />
                    <Nav.HjelpetekstBase id="sed" type="under">Les mer om de forskjellige SED typene</Nav.HjelpetekstBase>
                    <Skjema.Input feltNavn="sed" label="SED type" />
                  </Nav.Fieldset>
                  <div className="vedlegg__submmit">
                    <Nav.Knapp onClick={this.sendVedlegg}>Send Vedlegg</Nav.Knapp>
                  </div>
                  <StatusLinje status={vedleggStatus} />
                  <p>{vedlegg.data && JSON.parse(vedlegg.data).status}</p>
                </Nav.Panel>
              </Nav.Column>
            </Nav.Row>
          </form>
        </Nav.Container>
      </div>
    );
  }
}

Vedlegg.propTypes = {
  handleSubmit: PT.func.isRequired,
  sendSkjema: PT.func.isRequired,
  vedleggStatus: PT.string.isRequired,
  vedlegg: PT.object,
};

Vedlegg.defaultProps = {
  vedlegg: {},
};

const mapStateToProps = state => ({
  vedleggStatus: vedleggSelectors.VedleggStatusSelector(state),
  vedlegg: vedleggSelectors.VedleggSelector(state),
});

const mapDispatchToProps = dispatch => ({
  sendSkjema: data => dispatch(vedleggOperations.send(data)),
});

const form = {
  form: 'vedlegg',
  enableReinitialize: true,
  destroyOnUnmount: true,
  onSubmit: () => {},
};
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(form)(Vedlegg));
