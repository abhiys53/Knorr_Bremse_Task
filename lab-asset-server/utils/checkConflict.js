const { Reservation } = require("../models");
const { Op } = require("sequelize");

/**
 * Check if a reservation conflicts with existing ones
 * @param {number} asset_id 
 * @param {string} start_time 
 * @param {string} end_time 
 * @param {number} [excludeId] - ID of reservation to exclude (for updates)
 * @returns {Promise<boolean>}
 */
exports.hasConflict = async (asset_id, start_time, end_time, excludeId = null) => {
  const whereCondition = {
    asset_id,
    start_time: { [Op.lt]: end_time },
    end_time: { [Op.gt]: start_time },
  };

  if (excludeId) {
    whereCondition.id = { [Op.ne]: excludeId }; // exclude current reservation
  }

  const conflict = await Reservation.findOne({ where: whereCondition });
  return !!conflict;
};
