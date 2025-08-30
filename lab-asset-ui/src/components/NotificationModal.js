// src/components/NotificationModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const NotificationModal = ({ show, onHide, title, message }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Notification"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
