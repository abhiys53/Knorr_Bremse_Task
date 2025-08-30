import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PencilSquare, Trash } from "react-bootstrap-icons"; // ✅ import icons
import axiosInstance from "../../services/axiosInstance";
import NotificationModal from "../NotificationModal"; // ✅ import modal

const AssetList = ({ assets, onDeleteSuccess }) => {
  const navigate = useNavigate();

  // ✅ Modal state
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleDelete = async (id) => {
    try {
      await axiosInstance.post(`/assets/delete/${id}`);
      setModalTitle("Success");
      setModalMessage("Asset deleted successfully!");
      setModalShow(true);
      onDeleteSuccess();
    } catch (err) {
      console.error("Error deleting asset:", err);
      setModalTitle("Error");
      setModalMessage("Failed to delete asset. Please try again.");
      setModalShow(true);
    }
  };

  if (!assets || assets.length === 0) return <p>No assets available.</p>;

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>IP</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>{asset.ip}</td>
              <td>{asset.description}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() =>
                    navigate(`/edit-asset/${asset.id}`, { state: { asset } })
                  }
                >
                  <PencilSquare size={16} /> {/* ✅ pencil icon */}
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(asset.id)}
                >
                  <Trash size={16} /> {/* ✅ trash icon */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* ✅ Notification modal */}
      <NotificationModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default AssetList;
