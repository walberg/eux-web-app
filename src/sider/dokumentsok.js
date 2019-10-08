import React from 'react';
import { connect } from 'react-redux';
import PT from 'prop-types';

import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import * as API from '../services/api';
import { DokumenterSelectors } from '../ducks/dokumenter';
import { DokumentKort } from '../komponenter';

import './dokumentsok.css';


const DokumentSok = props => {
  const [searching, setSearching] = React.useState(false);
  const [nyttSok, setNyttSok] = React.useState(false);
  const [rinadokumenter, setRinadokumenter] = React.useState([]);

  const sokEtterDokumenter = () => {
    const { inntastetRinasaksnummer, settRinaSjekket, settRinaGyldighet } = props;
    if (inntastetRinasaksnummer.length === 0) return;
    setSearching(true);
    API.Dokumenter.hent(inntastetRinasaksnummer).then(response => {
      setSearching(false);
      setNyttSok(true);
      setRinadokumenter(response);

      settRinaSjekket(true);
      if (response.length > 0) {
        settRinaGyldighet(true);
      }
    });
  };

  const inntastetRinaSaksnummerHarBlittEndret = () => {
    setRinadokumenter([]);
    setNyttSok(false);
  };

  const harDokumenter = () => rinadokumenter && rinadokumenter.length;
  const harIngenDokumenter = () => rinadokumenter && rinadokumenter.length === 0;
  const dokumentKort = harDokumenter() ? <DokumentKort dokumenter={rinadokumenter} /> : null;
  const sokeStatus = (nyttSok && harIngenDokumenter()) ? <p>Ingen dokumenter funnet</p> : null;
  const visVenteSpinner = searching;
  return (
    <div className="dokumentsok">
      <div className="dokumentsok__skjema">
        <Skjema.Input
          label="RINA saksnummer"
          className="dokumentsok__input"
          bredde="XL"
          feltNavn="rinasaksnummer"
          onKeyUp={inntastetRinaSaksnummerHarBlittEndret}
        />
        <Nav.Knapp className="dokumentsok__knapp" onClick={sokEtterDokumenter} spinner={visVenteSpinner}>SØK</Nav.Knapp>
      </div>
      {dokumentKort}
      {sokeStatus}
    </div>
  );
};
DokumentSok.propTypes = {
  inntastetRinasaksnummer: PT.string,
  settRinaGyldighet: PT.func.isRequired,
  settRinaSjekket: PT.func.isRequired,
};
DokumentSok.defaultProps = {
  inntastetRinasaksnummer: '',
};

const mapStateToProps = state => ({
  rinadokumenter: DokumenterSelectors.dokumenterSelector(state),
});


export default connect(mapStateToProps, null)(DokumentSok);
