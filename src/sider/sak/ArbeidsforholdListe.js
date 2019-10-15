import React, { Component, Fragment } from 'react';
import PT from 'prop-types';

import * as MPT from '../../proptypes';
import ArbeidsforholdLinje from './ArbeidsforholdLinje';

const uuid = require('uuid/v4');

class ArbeidsforholdListe extends Component {
  arbeidsforholdKlikkHandler = arbeidsforholdIDnav => {
    const { fields, arbeidsforhold } = this.props;
    const alleValgteFelter = fields.getAll() || [];
    const valgtArbeidsgiver = arbeidsforhold.find(elem => elem.arbeidsforholdIDnav === arbeidsforholdIDnav);
    const eksistererVedPosisjon = alleValgteFelter.findIndex(item => item.arbeidsforholdIDnav === arbeidsforholdIDnav);
    if (eksistererVedPosisjon === -1) {
      fields.push({ ...valgtArbeidsgiver });
    } else {
      fields.remove(eksistererVedPosisjon);
    }
  };
  render() {
    const { fields, arbeidsforhold } = this.props;
    const alleValgteFelter = fields.getAll();
    return (
      <Fragment>
        {arbeidsforhold.map(arbeidsforholdet => {
          const arbeidsForholdErValgt = alleValgteFelter.find(item => item.arbeidsforholdIDnav === arbeidsforholdet.arbeidsforholdIDnav);
          return <ArbeidsforholdLinje
            key={uuid()}
            arbeidsforholdet={arbeidsforholdet}
            erValgt={arbeidsForholdErValgt !== undefined}
            arbeidsforholdKlikkHandler={this.arbeidsforholdKlikkHandler}
          />;
        })}
      </Fragment>
    );
  }
}

ArbeidsforholdListe.propTypes = {
  fields: PT.object.isRequired,
  arbeidsforhold: MPT.Arbeidsforhold,
};
ArbeidsforholdListe.defaultProps = {
  arbeidsforhold: [],
};

export default ArbeidsforholdListe;
