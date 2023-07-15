import React from 'react';
import Modal from 'react-modal';
import DateSelection from './EscapadeModalComponent/DatePickerField';
import PhotoSelection from './EscapadeModalComponents/PhotoPreview';
import EscapadeForm from './forms/EscapadeForm';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function EscapadeModal({ isOpen, onClose, isUserLoggedIn, isUserId, onServerMessage, onGoToConnexion }) {
  return (
    <div className="escapade-modal-container">
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Ajouter une escapade"
      >
        <div className="modal-header">
          <h4 className="modal-title">Ajouter une escapade</h4>
          <button
            type="button"
            className="close"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <hr />
        <EscapadeForm 
          isUserId={isUserId} 
          onServerMessage={onServerMessage} 
          onClose={onClose} 
        />
        <hr />
      </Modal>
    </div>
  );
}

export default EscapadeModal;
