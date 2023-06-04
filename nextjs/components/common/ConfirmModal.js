"use client";

import { Button, Modal } from "react-bootstrap";

export default function ConfirmModal(props) {
  const handlerClose = () => {
    props.setShow(false);
  };

  return (
    <Modal show={props.show} onHide={handlerClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant={props.confirmBtnClass} onClick={props.handlerConfirm}>
          {props.confirmBtnText}
        </Button>
        <Button variant="secondary" onClick={handlerClose}>
          취소
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
