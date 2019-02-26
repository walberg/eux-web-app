import React, { Component } from 'react';

import PT from 'prop-types';
import * as MPT from '../../proptypes';
import * as Nav from '../../utils/navFrontend';
import * as Api from '../../services/api';
import Arbeidsgivere from './arbeidsgivere';

class Arbeidsforhold extends Component {
  state = {
    arbeidsforhold: [],
  };

  hentArbeidsforhold = async () => {
    const { fnr } = this.props;
    const arbeidsforhold = await Api.Arbeidsgivere.hent(fnr);
    this.setState({ arbeidsforhold });
  };

  render() {
    const { arbeidsforhold } = this.state;
    return (
      <div className="arbeidsforhold">
        <Nav.Row>
          <Nav.Column xs="3">
            <strong>AA Registeret</strong><br />Arbeidsforhold/Arbeidsgivere
          </Nav.Column>
          <Nav.Column xs="2">
            <Nav.Knapp onClick={this.hentArbeidsforhold}>Søk</Nav.Knapp>
          </Nav.Column>
        </Nav.Row>
        <Nav.Row>
          &nbsp;
        </Nav.Row>
        {arbeidsforhold.length > 0 && <Arbeidsgivere arbeidsgivere={arbeidsforhold} />}
      </div>
    );
  }
}
Arbeidsforhold.propTypes = {
  fnr: PT.string,
  arbeidsforhold: MPT.Arbeidsforhold,
};
Arbeidsforhold.defaultProps = {
  fnr: '',
  arbeidsforhold: [],
};

export default Arbeidsforhold;
