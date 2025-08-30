import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

// New pages for add/edit
import AddAssetPage from "./pages/AddAssetPage";
import EditAssetPage from "./pages/EditAssetPage";
import AddReservationPage from "./pages/AddReservationPage";
import EditReservationPage from "./pages/EditReservationPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/signin" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        />

        {/* Asset routes */}
        <Route
          path="/add-asset"
          element={
            <PrivateRoute>
              <AddAssetPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-asset/:id"
          element={
            <PrivateRoute>
              <EditAssetPage />
            </PrivateRoute>
          }
        />

        {/* Reservation routes */}
        <Route
          path="/add-reservation"
          element={
            <PrivateRoute>
              <AddReservationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-reservation/:id"
          element={
            <PrivateRoute>
              <EditReservationPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
