// models/asset.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Asset",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      ip: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.TEXT }
    },
    {
      tableName: "assets",
      timestamps: false
    }
  );
};
