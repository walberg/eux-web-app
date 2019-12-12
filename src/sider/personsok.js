import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';

import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import { PersonOperations, PersonSelectors } from '../ducks/person';
import { PersonKort } from '../komponenter/';

import './personsok.css';

class PersonSok extends Component {
  state = {
    sokeerror: null,
  };
  erPersonFunnet = person => (person.fornavn.length !== undefined && person.fnr !== undefined);

  sokEtterPerson = () => {
    const {
      inntastetFnr, settFnrGyldighet, settFnrSjekket, personSok,
    } = this.props;
    if (!inntastetFnr || inntastetFnr.length === 0) return;
    const fnrPattern = /^[0-9]{11}$/;
    if (!fnrPattern.test(inntastetFnr)) {
      this.setState({ sokeerror: { message: 'Fnr må ha 11 siffer' } });
      return;
    }
    this.setState({ sokeerror: null });
    personSok(inntastetFnr.trim()).then(response => {
      if (response && response.data) {
        const person = { ...response.data };
        settFnrGyldighet(this.erPersonFunnet(person));
        settFnrSjekket(true);
      } else {
        settFnrGyldighet(false);
        settFnrSjekket(false);
      }
    });
  };

  render() {
    const { sokEtterPerson } = this;
    const { person, status, errdata } = this.props;
    const personKort = person && person.fornavn && person.etternavn ? <PersonKort person={person} /> : null;
    return (
      <div className="personsok">
        <div className="personsok__skjema">
          <Skjema.Input
            label="Finn bruker"
            className="personsok__input"
            feltNavn="fnr"
            data-cy="personsok-input"
          />
          {['PENDING'].includes(status) ? <div className="personsok__spinnerwrapper"><Nav.NavFrontendSpinner type="S" /></div> : null}
          <Nav.Knapp className="personsok__knapp" onClick={sokEtterPerson} data-cy="personsok-knapp">SØK</Nav.Knapp>
        </div>
        <Nav.Column xs="9">
          {this.state.sokeerror && <p>{this.state.sokeerror.message}</p>}
          {errdata.status && <Nav.AlertStripe type="feil">Brukeren du søker finnes ikke i TPS eller har en diskresjonskode.</Nav.AlertStripe>}
          {personKort}
        </Nav.Column>
      </div>
    );
  }
}

PersonSok.propTypes = {
  personSok: PT.func.isRequired,
  person: MPT.Person,
  settFnrGyldighet: PT.func.isRequired,
  settFnrSjekket: PT.func.isRequired,
  inntastetFnr: PT.string,
  status: PT.string,
  errdata: PT.object,
};

PersonSok.defaultProps = {
  person: {},
  inntastetFnr: '',
  status: '',
  errdata: {},
};

const mapStateToProps = state => ({
  person: PersonSelectors.personSelector(state),
  status: PersonSelectors.statusSelector(state),
  errdata: PersonSelectors.errorDataSelector(state),
});
const mapDispatchToProps = dispatch => ({
  personSok: fnr => dispatch(PersonOperations.hentPerson(fnr.trim())),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonSok);
