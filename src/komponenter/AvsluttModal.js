import React from 'react';
import PT from 'prop-types';
import * as Nav from '../utils/navFrontend';

import './avsluttModal.css';

const AvsluttModal = props => {
  const { visModal, closeModal } = props;
  return (
    <Nav.Modal
      ariaHideApp={false}
      isOpen={visModal}
      onRequestClose={() => closeModal()}
      closeButton={false}
      contentLabel="Bekreft navigasjon tilbake til forsiden"
    >
      <div className="modal__innhold">
        <Nav.Container align="center" fluid>
          <Nav.Row className="modal__overskrift">
            <Nav.Undertittel>Er du sikker på at du vil avbryte?</Nav.Undertittel>
          </Nav.Row >
          <Nav.Row className="modal__tekst">
            <Nav.Normaltekst>Informasjonen du har fyllt inn hittil vil ikke bli lagret.</Nav.Normaltekst>
          </Nav.Row>
          <Nav.Row>
            <Nav.Column xs="6">
              {/* Hack for å bruke en nav-knapp som lenke */}
              <a href="/" tabIndex="-1">
                <Nav.Hovedknapp className="modal__knapp" data-cy="avbryt-modal-hovedknapp">JA, AVBRYT</Nav.Hovedknapp>
              </a>
            </Nav.Column >
            <Nav.Column xs="6">
              <Nav.Hovedknapp className="modal__knapp" onClick={closeModal} data-cy="fortsett-modal-hovedknapp">NEI, FORTSETT</Nav.Hovedknapp>
            </Nav.Column >
          </Nav.Row>
        </Nav.Container>
      </div >
    </Nav.Modal>
  );
};

AvsluttModal.propTypes = {
  visModal: PT.bool.isRequired,
  closeModal: PT.func.isRequired,
};

export default AvsluttModal;
