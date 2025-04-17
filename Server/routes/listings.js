const express = require("express");
const router = express.Router();
const listings = require("../data/listings");

// GET all listings
router.get("/", (req, res) => {
  res.json(listings);
});

// GET single listing by ID
router.get("/:id", (req, res) => {
  const listingId = parseInt(req.params.id);
  const found = listings.find((item) => item.id === listingId);
  if (!found) {
    return res.status(404).json({ message: "Listing not found" });
  }
  res.json(found);
});

module.exports = router;