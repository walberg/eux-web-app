import React from 'react';
import PT from 'prop-types';

import * as Nav from '../utils/navFrontend';
import * as Skjema from '../felles-komponenter/skjema';
import * as Utils from '../utils';

import './dokumentsok.css';
// =&gt; {Utils.dato.formatterDatoTilNorsk(element.opprettetdato)}

const DokumentKort = ({dokumenter}) => {
  const optionValue = element => {
    let opprettetDatoString = '';
    if (element && element.opprettetdato) {
      const dato = Utils.dato.formatterDatoTilNorsk(element.opprettetdato);
      opprettetDatoString = ` => ${dato}`;
    }
    return `${element.kode}${opprettetDatoString}`;
  };
  return (
    <Nav.Panel className="dokumentsok__kort">
      <Skjema.Select id="id-rinadokument" feltNavn="rinadokumentID" label="Velg SED Type" bredde="xl">
        {dokumenter && dokumenter.map(element =>
          <option
            value={element.rinadokumentID}
            key={element.rinadokumentID}>{optionValue(element)}
          </option>)}
      </Skjema.Select>
    </Nav.Panel>
  )
};
DokumentKort.propTypes = {
  dokumenter: PT.array,
};
DokumentKort.defaultProps = {
  dokumenter: [],
};

export default DokumentKort;
