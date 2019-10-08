import React from 'react';

import PT from 'prop-types';

import * as Nav from '../../utils/navFrontend';
import FagsakerListe from './FagsakerListe';


export const Fagsaker = props => {
  const { fagsaker, saksID, oppdaterFagsakListe } = props;
  return (

    <Nav.Row>
      <Nav.Column xs="3">
        <FagsakerListe fagsaker={fagsaker} saksID={saksID} oppdaterFagsakListe={oppdaterFagsakListe} />
      </Nav.Column>
    </Nav.Row>
  );
};

Fagsaker.propTypes = {
  saksID: PT.string,
  fagsaker: PT.array.isRequired,
  oppdaterFagsakListe: PT.func.isRequired,
};
Fagsaker.defaultProps = {
  saksID: '',
};
