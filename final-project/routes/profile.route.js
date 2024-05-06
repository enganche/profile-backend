const express = require("express");
const router = express.Router();
const {
  getProfile,
  getProfileByID,
  updateProfile,
  deleteProfile,
  searchProfile,
} = require("../controllers/profile.controller.js");

router.get("/", getProfile);
router.get("/search", searchProfile); // Moved before the /:id route
router.get("/:id", getProfileByID);
router.put("/", updateProfile);
router.delete("/", deleteProfile);

module.exports = router;
