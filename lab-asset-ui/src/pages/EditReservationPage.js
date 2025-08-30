import React, { useEffect, useState } from "react";
import { Container, Card, Modal, Button, Image } from "react-bootstrap";
import ReservationForm from "../components/Reservation/ReservationForm";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import logo from "../assets/images/knorr-bremse-logo.svg";

const EditReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reservation = location.state?.reservation;
  const [assets, setAssets] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosInstance.get("/assets");
        setAssets(res.data);
      } catch (err) {
        console.error(err);
        setModalMessage("Error fetching assets");
        setModalShow(true);
      }
    };
    fetchAssets();
  }, []);

  const handleSuccess = () => {
    setModalMessage("Reservation updated successfully!");
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
    navigate("/");
  };

  if (!reservation) {
    return (
      <Container className="mt-4">
        <p>Error: Reservation data not found.</p>
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
        <h2 className="fw-bold">Edit Reservation</h2>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <Container className="my-4">
          <Card className="shadow-sm" style={{ minHeight: "70vh", display: "flex", flexDirection: "column" }}>
            <Card.Body className="d-flex flex-column flex-grow-1">
              <ReservationForm
                assets={assets}
                editingReservation={reservation}
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
    </div>
  );
};

export default EditReservationPage;
