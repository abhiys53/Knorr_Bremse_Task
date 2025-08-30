import React, { useState } from "react";
import { Container, Card, Modal, Button, Image } from "react-bootstrap";
import AssetForm from "../components/Asset/AssetForm";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/knorr-bremse-logo.svg";

const EditAssetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const asset = location.state?.asset;

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSuccess = () => {
    setModalMessage("Asset updated successfully!");
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    navigate("/"); // go back home
  };

  if (!asset) {
    return (
      <Container className="mt-4">
        <p>Error: Asset data not found.</p>
      </Container>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="w-100 border-bottom bg-white shadow-sm px-4 py-2 d-flex align-items-center">
        <Image src={logo} alt="Company Logo" height={40} className="me-2" />
        <span className="fw-bold fs-5">| Lab Asset Manager</span>
      </div>

      {/* Page Title */}
      <div className="text-center mt-4">
        <h2 className="fw-bold">Edit Asset</h2>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <Container className="my-4">
          <Card
            className="shadow-sm"
            style={{ minHeight: "70vh", display: "flex", flexDirection: "column" }}
          >
            <Card.Body className="d-flex flex-column flex-grow-1">
              <AssetForm
                editingAsset={asset}
                onSuccess={handleSuccess}
                cancelHandler={() => navigate("/")}
              />
            </Card.Body>
          </Card>

          {/* Success Modal */}
          <Modal show={modalShow} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Notification</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleModalClose}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>

      {/* Footer */}
      <footer className="footer bg-light text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Lab Asset Manager | Knorr-Bremse
        </small>
      </footer>

      {/* Styles */}
      <style>
        {`
          .page-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .content-wrapper {
            flex: 1;
          }
          body {
            background: linear-gradient(to right, #e6f0ff, #ffffff);
          }
        `}
      </style>
    </div>
  );
};

export default EditAssetPage;
