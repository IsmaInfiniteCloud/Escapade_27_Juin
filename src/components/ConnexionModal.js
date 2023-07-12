import React, { useState } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ConnexionForm from "./forms/ConnexionForm";

function ConnexionModal({
  isOpen,
  onClose,
  onGoToInscription,
  onSuccessfulLogin,
  nextPopupToShow,
  onGoToEscapade,
  onServerMessage,
}) {
  const resetForm = (callback) => {
    if (typeof callback === "function") {
      callback();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="custom-modal border border-dark"
    >
      <ConnexionForm
        onReset={resetForm}
        onSuccessfulLogin={onSuccessfulLogin}
        onServerMessage={onServerMessage}
        nextPopupToShow={nextPopupToShow}
        onClose={onClose}
        onGoToEscapade={onGoToEscapade}
        onGoToInscription={onGoToInscription}
      />
    </Modal>
  );
}

export default ConnexionModal;
