import React from 'react';
import Modal from 'react-modal';
import EscapadeForm from './EscapadeForm';
import DateSelection from './DateSelection';
import PhotoSelection from './PhotoSelection';

function EscapadeModal({ isEscapadeOpen, setIsEscapadeOpen }) {
  return (
    <div className="escapade-modal-container">
      <Modal
        isOpen={isEscapadeOpen}
        onRequestClose={() => setIsEscapadeOpen(false)}
        contentLabel="Ajouter une escapade"
      >
        <div className="modal-header">
          <h4 className="modal-title">Ajouter une escapade</h4>
          <button
            type="button"
            className="close"
            onClick={() => setIsEscapadeOpen(false)}
          >
            &times;
          </button>
        </div>
        <hr />
        <EscapadeForm />
        <DateSelection />
        <PhotoSelection />
        <hr />
        <div
          className="modal-footer my-3 mx-5"
          style={{ position: "sticky", bottom: 0, zIndex: 1 }}
        >
   
        </div>
      </Modal>
    </div>
  );
}

export default EscapadeModal;