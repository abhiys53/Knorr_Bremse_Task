import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Clipboard, Person, Calendar2Event } from "react-bootstrap-icons";
import axiosInstance from "../../services/axiosInstance";
import NotificationModal from "../NotificationModal";

const ReservationForm = ({ assets, onSuccess, editingReservation, clearEditing, cancelHandler }) => {
  const [id, setId] = useState(null);
  const [asset_id, setAssetId] = useState("");
  const [user_name, setUserName] = useState("");
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (editingReservation) {
      setId(editingReservation.id);
      setAssetId(editingReservation.asset_id);
      setUserName(editingReservation.user_name);
      setStartTime(editingReservation.start_time);
      setEndTime(editingReservation.end_time);
      setNote(editingReservation.note || "");
    } else {
      setId(null);
      setAssetId("");
      setUserName("");
      setStartTime("");
      setEndTime("");
      setNote("");
    }
  }, [editingReservation]);

  const showModal = (message) => {
    setModalMessage(message);
    setModalShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { asset_id, user_name, start_time, end_time, note };
      if (id) {
        await axiosInstance.post(`/reservations/update/${id}`, payload);
        showModal("Reservation updated successfully!");
      } else {
        await axiosInstance.post("/reservations/add", payload);
        showModal("Reservation added successfully!");
      }

      clearEditing && clearEditing();
      onSuccess();
      setId(null);
      setAssetId("");
      setUserName("");
      setStartTime("");
      setEndTime("");
      setNote("");
    } catch (err) {
      console.error(err);
      showModal(err.response?.data?.error || "Error saving reservation!");
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="d-flex flex-column flex-grow-1"
        style={{ height: "100%" }}
      >
        <div className="flex-grow-1">

          <Form.Group className="mb-3">
            <Form.Label>Select Asset</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Clipboard />
              </InputGroup.Text>
              <Form.Select
                value={asset_id}
                onChange={(e) => setAssetId(e.target.value)}
                required
              >
                <option value="">Select Asset</option>
                {assets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.ip})
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Person />
              </InputGroup.Text>
              <Form.Control
                type="text"
                value={user_name}
                placeholder="Enter user name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Start Time</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Calendar2Event />
              </InputGroup.Text>
              <Form.Control
                type="datetime-local"
                value={start_time}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>End Time</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Calendar2Event />
              </InputGroup.Text>
              <Form.Control
                type="datetime-local"
                value={end_time}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>


          <Form.Group className="mb-3 flex-grow-1">
            <Form.Label>Note</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <Clipboard />
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                value={note}
                placeholder="Optional note"
                onChange={(e) => setNote(e.target.value)}
                style={{ minHeight: "100px", resize: "vertical" }}
              />
            </InputGroup>
          </Form.Group>
        </div>


        <div className="d-flex justify-content-center mt-auto">
          <Button type="submit" variant={id ? "warning" : "success"}>
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

export default ReservationForm;
