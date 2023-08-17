import React, { useState } from "react";
import { Button, Col, Container, Modal, Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VoucherDetailsModal = (props) => {
  const { visible, voucher, onCancel } = props;

  const navigate = useNavigate();

  const navigateHandler = () => {
navigate("/select-voucher")
  }

  return (
    <Modal
      show={visible}
      onHide={onCancel}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {voucher?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              <Image src={voucher?.card} style={{ width: "100%", height:"auto" }}></Image>
            </Col>
            <Col xs={6} md={4}>
              <strong>Category: {voucher?.category}</strong>
            </Col>
          </Row>

          <Row style={{marginTop:"20px"}}>
            <p>
              This voucher is available in:{" "}
              <strong>{voucher?.location.join(", ")}</strong>
            </p>
          </Row>
          <Row>
            <p>
              The available prices for that voucher:{" "}
              <strong>{voucher?.price.join(", ")+" €"}</strong>
            </p>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={navigateHandler}>Select Me</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VoucherDetailsModal;
