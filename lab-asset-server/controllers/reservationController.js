const { Reservation, Asset } = require("../models");
const { isValidDateRange } = require("../utils/validateData");
const { hasConflict } = require("../utils/checkConflict"); // import from utils

// Get all reservations
exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({ include: Asset });
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// Add new reservation
exports.addReservation = async (req, res, next) => {
  try {
    const { asset_id, user_name, start_time, end_time, note } = req.body;

    if (!asset_id || !user_name || !start_time || !end_time) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    if (!isValidDateRange(start_time, end_time)) {
      return res.status(400).json({ error: "Start time must be before end time" });
    }

    if (await hasConflict(asset_id, start_time, end_time)) {
      return res.status(409).json({ error: "Asset already reserved during this time" });
    }

    const reservation = await Reservation.create({ asset_id, user_name, start_time, end_time, note });
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

// Update reservation (via POST)
exports.updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { asset_id, start_time, end_time } = req.body;

    if (!isValidDateRange(start_time, end_time)) {
      return res.status(400).json({ error: "Start time must be before end time" });
    }

    // Conflict check, excluding current reservation
    if (await hasConflict(asset_id, start_time, end_time, id)) {
      return res.status(409).json({ error: "Asset already reserved during this time" });
    }

    await Reservation.update(req.body, { where: { id } });
    const updated = await Reservation.findByPk(id, { include: Asset });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Cancel reservation (via POST)
exports.deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Reservation.destroy({ where: { id } });
    res.json({ message: "Reservation cancelled" });
  } catch (err) {
    next(err);
  }
};
