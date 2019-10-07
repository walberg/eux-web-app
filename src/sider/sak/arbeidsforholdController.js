import React from 'react';

import PT from 'prop-types';
import * as MPT from '../../proptypes';
import * as Nav from '../../utils/navFrontend';
import * as Api from '../../services/api';
import Arbeidsforhold from './arbeidsforhold';

const ArbeidsforholdController = props => {
  const [arbeidsforhold, setArbeidsforhold] = React.useState([]);

  const hentArbeidsforhold = async () => {
    const { fnr } = props;
    const respone = await Api.Arbeidsforhold.hent(fnr);
    setArbeidsforhold(respone);
  };

  return (
    <div className="arbeidsforhold">
      <Nav.Row>
        <Nav.Column xs="3">
          <strong>AA Registeret</strong><br />Arbeidsforhold/Arbeidsgivere
        </Nav.Column>
        <Nav.Column xs="2">
          <Nav.Knapp onClick={hentArbeidsforhold}>Søk</Nav.Knapp>
        </Nav.Column>
      </Nav.Row>
      <Nav.Row>
        &nbsp;
      </Nav.Row>
      {arbeidsforhold.length > 0 && <Arbeidsforhold arbeidsforhold={arbeidsforhold} />}
    </div>
  );
};
ArbeidsforholdController.propTypes = {
  fnr: PT.string,
  arbeidsforhold: MPT.Arbeidsforhold,
};
ArbeidsforholdController.defaultProps = {
  fnr: '',
  arbeidsforhold: [],
};

export default ArbeidsforholdController;
