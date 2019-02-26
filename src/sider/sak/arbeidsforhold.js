import React, { Component } from 'react';

import PT from 'prop-types';
import * as MPT from '../../proptypes';
import * as Nav from '../../utils/navFrontend';
import * as Api from '../../services/api';
import Arbeidsgivere from './arbeidsgivere';

class Arbeidsforhold extends Component {
  state = {
    arbeidsgivere: [],
  };

  hentArbeidsforhold = async () => {
    const { fnr } = this.props;
    const arbeidsgivere = await Api.Arbeidsgivere.hent(fnr);
    this.setState({ arbeidsgivere });
  };

  render() {
    const { arbeidsgivere } = this.state;
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
        {arbeidsgivere.length > 0 && <Arbeidsgivere arbeidsgivere={arbeidsgivere} />}
      </div>
    );
  }
}
Arbeidsforhold.propTypes = {
  fnr: PT.string,
  arbeidsgivere: MPT.Arbeidsgivere,
};
Arbeidsforhold.defaultProps = {
  fnr: '',
  arbeidsgivere: [],
};

export default Arbeidsforhold;
