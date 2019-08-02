import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearFields } from 'redux-form';
import PT from 'prop-types';

import * as MPT from '../proptypes/';
import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import { PersonOperations, PersonSelectors } from '../ducks/person';
import { PanelHeader } from '../felles-komponenter/panelHeader';
import { StatusLinje } from '../felles-komponenter/statuslinje';

import * as Eux from '../felles-komponenter/Ikon';

import './personsok.css';
import { formatterDatoTilNorsk } from '../utils/dato';


const PersonKort = ({ person }) => {
  const {
    fnr, fdato, fornavn, etternavn, kjoenn,
  } = person;

  const panelUndertittel = (
    <div className="panelheader__undertittel">
      <span>Fødselsnummer: {fnr}</span>
      <span>Fødselsdato: {formatterDatoTilNorsk(fdato)}</span>
    </div>
  );

  return (
    <div>
      <Nav.Panel className="personsok__kort">
        <PanelHeader ikon={Eux.IkonFraKjonn(kjoenn)} tittel={`${fornavn} ${etternavn}`} undertittel={panelUndertittel} />
        <Nav.Knapp
          className="familierelasjoner__knapp familierelasjoner__knapp--slett"
          onClick={() => window.location.reload()}
        >
          <Eux.Icon kind="trashcan" size="20" className="familierelasjoner__knapp__ikon" />
          <div className="familierelasjoner__knapp__label">Fjern</div>
        </Nav.Knapp>
      </Nav.Panel>
    </div>
  );
};

PersonKort.propTypes = {
  person: MPT.Person.isRequired,
};

class PersonSok extends Component {
  erPersonFunnet = person => (person.fornavn.length !== undefined && person.fnr !== undefined);

  sokEtterPerson = () => {
    const {
      inntastetFnr, settFnrGyldighet, settFnrSjekket, personSok, nullstillPerson, nullstillSkjemaFelter, resettSkjemaState,
    } = this.props;
    // nullstiller persondata før søk
    nullstillPerson();
    personSok(inntastetFnr).then(response => {
      if (response && response.data) {
        const person = { ...response.data };
        settFnrGyldighet(this.erPersonFunnet(person));
        settFnrSjekket(true);
        // Vi fant en bruker, nullstiller alle felter i opprettSak bortsett fra fnr
        nullstillSkjemaFelter(['sektor', 'buctype', 'sedtype', 'landKode', 'institusjonsID']);
        // fagsak og tema ligger i lokal state i personsok - dette resettes her:
        resettSkjemaState();
      } else {
        // Ingen bruker funnet, nullstiller alle felter i opprettSak bortsett fra fnr, og setter flagg til false
        nullstillSkjemaFelter(['sektor', 'buctype', 'sedtype', 'landKode', 'institusjonsID']);
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
        <Nav.Column xs="6">
          {errdata.status && <StatusLinje status={status} tittel="Fødselsnummer søket" />}
          {errdata.status && <p>{errdata.message}</p>}
          {personKort}
        </Nav.Column>

      </div>
    );
  }
}

PersonSok.propTypes = {
  nullstillSkjemaFelter: PT.func.isRequired,
  personSok: PT.func.isRequired,
  nullstillPerson: PT.func.isRequired,
  person: MPT.Person,
  settFnrGyldighet: PT.func.isRequired,
  settFnrSjekket: PT.func.isRequired,
  resettSkjemaState: PT.func.isRequired,
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
  nullstillPerson: () => dispatch(PersonOperations.nullstillPerson()),
  nullstillSkjemaFelter: felter => dispatch(clearFields('opprettSak', false, false, ...felter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonSok);
