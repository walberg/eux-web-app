import React from 'react';
import PT from 'prop-types';

import * as MPT from '../../proptypes';
import * as Ikoner from '../../resources/images/index';
import * as Nav from '../../utils/navFrontend';
import { formatterDatoTilNorsk } from '../../utils/dato';

const btnStyle = {
  margin: '1.25em 0 0 0',
};

const ArbeidsforholdLinje = props => {
  const { arbeidsforholdet, erValgt, arbeidsforholdKlikkHandler } = props;
  const {
    arbeidsforholdIDnav, navn, orgnr, ansettelsesPeriode: { fom, tom },
  } = arbeidsforholdet;
  return (
    <Nav.Row>
      <Nav.Column xs="1" style={{ width: '5%' }}>
        <div className="panelheader__ikon" style={{ marginTop: '0.25em', backgroundImage: `url('${Ikoner.Arbeidsforhold}')` }} />
      </Nav.Column>
      <Nav.Column xs="2" style={{ width: '20%', marginBottom: '0.5em' }}>
        <strong>{navn}</strong><br />Orgnr:&nbsp;{orgnr}<br />StartDato:&nbsp;{formatterDatoTilNorsk(fom)}<br />SluttDato:&nbsp;{formatterDatoTilNorsk(tom)}
      </Nav.Column>
      <Nav.Column xs="1" style={btnStyle} >
        <Nav.Checkbox checked={erValgt} onChange={() => arbeidsforholdKlikkHandler(arbeidsforholdIDnav)} label="Velg" />
      </Nav.Column>
    </Nav.Row>
  );
};
ArbeidsforholdLinje.propTypes = {
  arbeidsforholdet: MPT.Arbeidsforholdet.isRequired,
  erValgt: PT.bool,
  arbeidsforholdKlikkHandler: PT.func.isRequired,
};
ArbeidsforholdLinje.defaultProps = {
  erValgt: false,
};

export default ArbeidsforholdLinje;
