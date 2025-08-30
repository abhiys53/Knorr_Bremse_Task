import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Collapse,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  ChevronDown,
  ChevronUp,
  PencilSquare,
  Trash,
} from "react-bootstrap-icons";
import AssetList from "../components/Asset/AssetList";
import ReservationList from "../components/Reservation/ReservationList";
import LogoutButton from "../components/LogoutButton";
import axiosInstance from "../services/axiosInstance";
import logo from "../assets/images/knorr-bremse-logo.svg";

const Home = ({ setIsLoggedIn }) => {
  const [assets, setAssets] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [openAssets, setOpenAssets] = useState(true);
  const [openReservations, setOpenReservations] = useState(false);
  const navigate = useNavigate();

  const fetchAssets = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/assets");
      setAssets(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    }
  }, [setIsLoggedIn]);

  const fetchReservations = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/reservations");
      setReservations(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
      }
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    fetchAssets();
    fetchReservations();
  }, [fetchAssets, fetchReservations]);

  return (
    <div className="page-wrapper">
      {/* Full-width Header */}
      <div className="w-100 border-bottom bg-white shadow-sm px-4 py-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image src={logo} alt="Company Logo" height={40} className="me-2" />
          <span className="fw-bold fs-5">| Lab Asset Management</span>
        </div>
        <div>
          <LogoutButton setIsLoggedIn={setIsLoggedIn} />
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Welcome Message */}
        <div className="py-4 mb-4 text-center">
          <h2 className="fw-bold text-primary">Welcome to Admin Panel</h2>
          <p className="text-muted mb-0">
            Manage your lab assets and reservations efficiently
          </p>
        </div>

        <Container className="mt-3">
          {/* Action Buttons */}
          <Row className="mb-4 text-center">
            <Col xs={12} md={6} className="mb-3">
              <Button
                variant="primary"
                className="w-100 d-flex align-items-center justify-content-center custom-btn big-btn"
                onClick={() => navigate("/add-asset")}
              >
                <PlusCircle className="me-2" size={28} /> Add Asset
              </Button>
            </Col>
            <Col xs={12} md={6}>
              <Button
                variant="success"
                className="w-100 d-flex align-items-center justify-content-center custom-btn big-btn"
                onClick={() => navigate("/add-reservation")}
              >
                <PlusCircle className="me-2" size={28} /> Add Reservation
              </Button>
            </Col>
          </Row>

          {/* Asset Section */}
          <Card className="mb-3 shadow-sm">
            <Card.Header
              onClick={() => setOpenAssets(!openAssets)}
              style={{ cursor: "pointer" }}
              className="d-flex justify-content-between align-items-center"
            >
              <h5 className="mb-0">Assets</h5>
              {openAssets ? <ChevronUp /> : <ChevronDown />}
            </Card.Header>
            <Collapse in={openAssets}>
              <div>
                <Card.Body>
                  <AssetList
                    assets={assets}
                    onEdit={(asset) => navigate(`/edit-asset/${asset.id}`)}
                    onDeleteSuccess={() => {
                      fetchAssets();
                      fetchReservations();
                    }}
                    EditIcon={PencilSquare}
                    DeleteIcon={Trash}
                  />
                </Card.Body>
              </div>
            </Collapse>
          </Card>

          {/* Reservation Section */}
          <Card className="mb-3 shadow-sm">
            <Card.Header
              onClick={() => setOpenReservations(!openReservations)}
              style={{ cursor: "pointer" }}
              className="d-flex justify-content-between align-items-center"
            >
              <h5 className="mb-0">Reservations</h5>
              {openReservations ? <ChevronUp /> : <ChevronDown />}
            </Card.Header>
            <Collapse in={openReservations}>
              <div>
                <Card.Body>
                  <ReservationList
                    reservations={reservations}
                    onEdit={(res) => navigate(`/edit-reservation/${res.id}`)}
                    onDeleteSuccess={fetchReservations}
                    EditIcon={PencilSquare}
                    DeleteIcon={Trash}
                  />
                </Card.Body>
              </div>
            </Collapse>
          </Card>
        </Container>
      </div>

      {/* Footer */}
      <footer className="footer bg-light text-center py-3 border-top">
        <small className="text-muted">
          © {new Date().getFullYear()} Lab Asset Manager | Knorr-Bremse
        </small>
      </footer>

      {/* Custom CSS */}
      <style>
        {`
          /* Flex wrapper for sticky footer */
          .page-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .content-wrapper {
            flex: 1;
          }
          .custom-btn {
            transition: all 0.3s ease;
            font-size: 1.1rem;
            font-weight: 500;
          }
          .big-btn {
            padding: 1rem 1.25rem !important;
            border-radius: 10px;
          }
          .custom-btn:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.25);
          }
          body {
            background: linear-gradient(to right, #e6f0ff, #ffffff);
          }
          html {
            scrollbar-gutter: stable;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
