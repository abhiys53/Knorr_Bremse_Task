// models/reservation.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Reservation",
    {
      user_name: { type: DataTypes.STRING, allowNull: false },
      start_time: { type: DataTypes.STRING, allowNull: false },
      end_time: { type: DataTypes.STRING, allowNull: false },
      note: { type: DataTypes.TEXT }
    },
    {
      tableName: "reservations",
      timestamps: false
    }
  );
};
