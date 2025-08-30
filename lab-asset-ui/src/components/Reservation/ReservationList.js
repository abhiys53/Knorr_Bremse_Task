import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons"; // ✅ icons
import axiosInstance from "../../services/axiosInstance";
import NotificationModal from "../NotificationModal"; // ✅ import reusable modal

const ReservationList = ({ reservations, onDeleteSuccess }) => {
  const navigate = useNavigate();

  // ✅ Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await axiosInstance.post(`/reservations/delete/${id}`);
      setModalTitle("Success");
      setModalMessage("Reservation cancelled successfully!");
      setModalShow(true);
      onDeleteSuccess();
    } catch (err) {
      console.error("Error deleting reservation:", err);
      setModalTitle("Error");
      setModalMessage("Failed to cancel reservation. Please try again.");
      setModalShow(true);
    }
  };

  if (!reservations || reservations.length === 0)
    return <p>No reservations available.</p>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Asset</th>
            <th>User</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id}>
              <td>{res.Asset?.name}</td>
              <td>{res.user_name}</td>
              <td>{res.start_time}</td>
              <td>{res.end_time}</td>
              <td>{res.note}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() =>
                    navigate(`/edit-reservation/${res.id}`, {
                      state: { reservation: res },
                    })
                  }
                >
                  <PencilSquare size={16} /> {/* ✅ pencil icon */}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(res.id)}
                >
                  <Trash size={16} /> {/* ✅ trash icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Notification Modal */}
      <NotificationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default ReservationList;
