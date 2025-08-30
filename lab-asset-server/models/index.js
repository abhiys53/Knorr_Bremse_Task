const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const { DATABASE_PATH } = require("../config/config");

// Check if database file exists
if (!fs.existsSync(DATABASE_PATH)) {
  console.error("Database file not found at:", DATABASE_PATH);
  process.exit(1); // stop server to prevent creating a new DB
}

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DATABASE_PATH,
  logging: false
});

const User = require("./user")(sequelize, DataTypes);
const Asset = require("./asset")(sequelize, DataTypes);
const Reservation = require("./reservation")(sequelize, DataTypes);

// Relationships
Reservation.belongsTo(Asset, { foreignKey: "asset_id" });
Asset.hasMany(Reservation, { foreignKey: "asset_id" });

module.exports = { sequelize, Asset, Reservation, User };
