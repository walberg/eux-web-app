import React, { Component } from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';

import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import { PersonOperations, PersonSelectors } from '../ducks/person';
import { StatusLinje } from '../felles-komponenter/statuslinje';
import { PersonKort } from '../komponenter/';

import './personsok.css';

class PersonSok extends Component {
  erPersonFunnet = person => (person.fornavn.length !== undefined && person.fnr !== undefined);

  sokEtterPerson = () => {
    const {
      inntastetFnr, settFnrGyldighet, settFnrSjekket, personSok,
    } = this.props;
    if (inntastetFnr.length === 0) return;
    personSok(inntastetFnr).then(response => {
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
          />
          {['PENDING'].includes(status) ? <div className="personsok__spinnerwrapper"><Nav.NavFrontendSpinner type="S" /></div> : null}
          <Nav.Knapp className="personsok__knapp" onClick={sokEtterPerson}>SØK</Nav.Knapp>
        </div>
        {errdata.status && <StatusLinje status={status} tittel="Fødselsnummer søket" />}
        {errdata.status && <p>{errdata.message}</p>}
        {personKort}
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
  personSok: fnr => dispatch(PersonOperations.hentPerson(fnr)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonSok);
