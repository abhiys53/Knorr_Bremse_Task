import React, { useState } from "react";
import { signUp } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Card,
  Modal,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { PersonFill, EnvelopeFill, LockFill } from "react-bootstrap-icons";
import logo from "../assets/images/knorr-bremse-logo.svg";
import signupBanner from "../assets/auth/signupbanner.jpg";

function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(form);
      setModalMessage("Sign Up Successful! Redirecting to Sign In...");
      setIsSuccess(true);
      setModalShow(true);

      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setModalMessage(err.response?.data?.message || "Error signing up");
      setIsSuccess(false);
      setModalShow(true);
    }
  };

  const handleModalClose = () => setModalShow(false);

  return (
    <Container
      fluid
      className="vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${signupBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Row className="p-3 shadow-sm bg-light">
        <Col className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <h5 className="mb-0 text-muted">| Admin Sign Up</h5>
        </Col>
      </Row>

      {/* Centered Form */}
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
        <Col md={5} lg={4}>
          <Card className="p-4 shadow-lg border-0 bg-white bg-opacity-75">
            <h3 className="mb-3 text-center">Sign Up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <PersonFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <EnvelopeFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    placeholder="Enter email"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <LockFill />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    placeholder="Enter password"
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Button type="submit" className="w-100 mb-2">
                Sign Up
              </Button>
            </Form>
            <div className="text-center mt-2">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal show={modalShow} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isSuccess ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={isSuccess ? "success" : "primary"}
            onClick={handleModalClose}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default SignUp;
