import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    if (setIsLoggedIn) setIsLoggedIn(false);
    navigate("/signin"); // redirect to login
  };

  return (
    <Button 
      variant="outline-danger" 
      size="sm" 
      className="fw-bold"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
