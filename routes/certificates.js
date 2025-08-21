const express = require("express");
const router = express.Router();
const Certificate = require("../models/Certificate");

// GET all certificates
router.get("/", async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
