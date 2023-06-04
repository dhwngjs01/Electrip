"use client";

import { Button, Modal } from "react-bootstrap";

export default function ConfirmModal(props) {
  const handleClose = () => props.setShow(false);

  return (
    <Modal show={props.show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant={props.confirmBtnClass} onClick={props.handlerConfirm}>
          {props.confirmBtnText}
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
