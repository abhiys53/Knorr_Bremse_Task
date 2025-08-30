// controllers/assetController.js
const { Asset } = require("../models");
const { isValidIP } = require("../utils/validateData");

// Get all assets
exports.getAllAssets = async (req, res, next) => {
  try {
    const assets = await Asset.findAll();
    res.json(assets);
  } catch (err) {
    next(err);
  }
};

// Add new asset
exports.addAsset = async (req, res, next) => {
  try {
    const { name, ip, description } = req.body;

    if (!name || !ip) {
      return res.status(400).json({ error: "Name and IP are required" });
    }

    if (!isValidIP(ip)) {
      return res.status(400).json({ error: "Invalid IP address" });
    }

    const asset = await Asset.create({ name, ip, description });
    res.json(asset);
  } catch (err) {
    next(err);
  }
};

// Update asset (via POST)
exports.updateAsset = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Asset.update(req.body, { where: { id } });
    const updated = await Asset.findByPk(id);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete asset (via POST)
exports.deleteAsset = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Asset.destroy({ where: { id } });
    res.json({ message: "Asset deleted" });
  } catch (err) {
    next(err);
  }
};
