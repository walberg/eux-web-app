import React from 'react';
import PT from 'prop-types';

import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import * as Utils from '../utils';

import './dokumentsok.css';


const DokumentKort = ({ dokumenter }) => (
  <Nav.Panel className="dokumentsok__kort">
    <Skjema.Select id="id-rinadokument" feltNavn="rinadokumentID" label="Velg SED Type" bredde="xl">
      {dokumenter && dokumenter.map(element =>
        <option
          value={element.rinadokumentID}
          key={element.rinadokumentID}>{element.kode} =&gt; {Utils.dato.formatterDatoTilNorsk(element.opprettetdato)}
        </option>)}
    </Skjema.Select>
  </Nav.Panel>
);
DokumentKort.propTypes = {
  dokumenter: PT.array,
};
DokumentKort.defaultProps = {
  dokumenter: [],
};

export default DokumentKort;
