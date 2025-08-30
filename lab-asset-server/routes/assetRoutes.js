const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

router.get("/", assetController.getAllAssets);
router.post("/add", assetController.addAsset);
router.post("/update/:id", assetController.updateAsset);
router.post("/delete/:id", assetController.deleteAsset);

module.exports = router;
