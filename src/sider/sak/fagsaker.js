import React from 'react';

import PT from 'prop-types';

import * as Nav from '../../utils/navFrontend';
import * as Sort from '../../utils/sortering';

const uuid = require('uuid/v4');

const FagsakerListe = props => {
  const { fagsaker, saksID, oppdaterFagsakListe } = props;
  return (
    <Nav.Select id="id-fagsaker" bredde="xl" label="Velg fagsak" value={saksID} onChange={oppdaterFagsakListe}>
      <option defaultChecked />
      {fagsaker && fagsaker.concat().sort(Sort.sortBy('fagsakNr')).map(element => <option value={element.saksID} key={uuid()}>{element.fagsakNr ? element.fagsakNr : element.saksID}</option>)}
    </Nav.Select>
  );
};

FagsakerListe.propTypes = {
  saksID: PT.string,
  fagsaker: PT.array.isRequired,
  oppdaterFagsakListe: PT.func.isRequired,
};
FagsakerListe.defaultProps = {
  saksID: '',
};

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
