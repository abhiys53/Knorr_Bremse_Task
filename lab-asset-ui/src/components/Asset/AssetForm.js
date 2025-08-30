import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Person, Laptop, FileText } from "react-bootstrap-icons";
import axiosInstance from "../../services/axiosInstance";
import NotificationModal from "../NotificationModal";

const AssetForm = ({ onSuccess, editingAsset, clearEditing, cancelHandler }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [ip, setIp] = useState("");
  const [description, setDescription] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (editingAsset) {
      setId(editingAsset.id);
      setName(editingAsset.name);
      setIp(editingAsset.ip);
      setDescription(editingAsset.description || "");
    } else {
      setId(null);
      setName("");
      setIp("");
      setDescription("");
    }
  }, [editingAsset]);

  const showModal = (message) => {
    setModalMessage(message);
    setModalShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, ip, description };
      if (id) {
        await axiosInstance.post(`/assets/update/${id}`, payload);
        showModal("Asset updated successfully!");
      } else {
        await axiosInstance.post("/assets/add", payload);
        showModal("Asset added successfully!");
      }

      clearEditing && clearEditing();
      onSuccess();
      setId(null);
      setName("");
      setIp("");
      setDescription("");
    } catch (err) {
      console.error(err);
      showModal(err.response?.data?.error || "Error saving asset!");
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column flex-grow-1"
        style={{ height: "100%" }}
      >
        {/* Form fields grow to fill available space */}
        <div className="flex-grow-1">
          {/* Name Field */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Person />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter asset name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* IP Field */}
          <Form.Group className="mb-3">
            <Form.Label>IP Address</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Laptop />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter IP"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Description Field */}
          <Form.Group className="mb-3 flex-grow-1">
            <Form.Label>Description</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FileText />
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ minHeight: "100px", resize: "vertical" }}
              />
            </InputGroup>
          </Form.Group>
        </div>

        {/* Buttons fixed at bottom */}
        <div className="d-flex justify-content-center mt-auto">
          <Button type="submit" variant={id ? "warning" : "primary"}>
            {id ? "Update" : "Add"}
          </Button>
          {(id || cancelHandler) && (
            <Button
              variant="secondary"
              onClick={cancelHandler || clearEditing}
              className="ms-2"
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>

      <NotificationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        message={modalMessage}
      />
    </>
  );
};

export default AssetForm;
