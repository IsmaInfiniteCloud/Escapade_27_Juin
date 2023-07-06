import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MessageModal({ isOpen, message, onClose }) {
  return (
    <Modal
      className="message-modal border border-dark"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Message Modal"
    >
      <h4>{message}</h4>
    </Modal>
  );
}

export default MessageModal;
