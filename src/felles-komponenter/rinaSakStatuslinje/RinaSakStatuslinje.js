import React from 'react';
import { Link } from 'react-router-dom';
import PT from 'prop-types';
import * as Nav from '../../utils/navFrontend';

import './rinaSakStatuslinje.css';

const RinaSakStatuslinje = ({
  status, tittel, rinaURL, routePath = null, errdata,
}) => {
  if (['NOT_STARTED', 'PENDING'].includes(status)) { return null; }

  const type = status === 'OK' ? 'suksess' : 'feil';
  const successTekst = (
    <div>
      {routePath ? <Link to={routePath}>{tittel}</Link> : <span>{tittel}</span>}
      {' er opprettet. '}
      {rinaURL ? <Nav.Lenke href={rinaURL} target="_blank" className="vedlegg__lenke">Gå direkte til Rina.</Nav.Lenke> : null}
    </div>
  );
  const errorTekst = (
    <div>
      {(errdata.url && errdata.rinasaksnummer) ? <Link to={`/vedlegg?rinasaksnummer=${errdata.rinasaksnummer}`}>{`Saksnummer: ${errdata.rinasaksnummer} `}</Link> : 'Sak '}
      {errdata.message ? `er opprettet med feilmelding: ${errdata.message} ` : 'med upesifisert feil. '}
      {errdata.url && <Nav.Lenke href={errdata.url} target="_blank" className="vedlegg__lenke">Gå direkte til Rina.</Nav.Lenke>}
    </div>
  );

  const statusTekst = status === 'OK' ? successTekst : errorTekst;

  return (
    <Nav.Column xs="9">
      <div className="rinaSakStatuslinje">
        <Nav.AlertStripe type={type}>{statusTekst}</Nav.AlertStripe>
      </div>
    </Nav.Column>
  );
};

RinaSakStatuslinje.propTypes = {
  errdata: PT.object,
  status: PT.string.isRequired,
  tittel: PT.string.isRequired,
  rinaURL: PT.string,
  routePath: PT.string,
};

RinaSakStatuslinje.defaultProps = {
  rinaURL: '',
  routePath: null,
  errdata: {},
};

export default RinaSakStatuslinje;
