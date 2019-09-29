import React from 'react';
import PT from 'prop-types';
import moment from 'moment/moment';

import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';

import './dokumentsok.css';

const yyyMMdd = dato => moment(dato).format('YYYY-MM-DD');

const DokumentKort = ({ dokumenter }) => (
  <Nav.Panel className="dokumentsok__kort">
    <Skjema.Select id="id-rinadokument" feltNavn="rinadokumentID" label="Velg SED Type" bredde="xl">
      {dokumenter && dokumenter.map(element =>
        <option
          value={element.rinadokumentID}
          key={element.rinadokumentID}>{element.kode} =&gt; {yyyMMdd(element.opprettetdato)}
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
