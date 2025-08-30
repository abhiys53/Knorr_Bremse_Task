const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.post("/add", reservationController.addReservation);
router.post("/update/:id", reservationController.updateReservation);
router.post("/delete/:id", reservationController.deleteReservation);

module.exports = router;
