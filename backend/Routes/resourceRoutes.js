const express = require('express');
const router = express.Router();


//  GET all resources
router.get('/', (req, res) => {
  res.status(200).json([
    { id: 1, name: "Community Food Pantry", category: "food" },
    { id: 2, name: "Red Cross Blood Bank", category: "blood" }
  ]);
});
// GET a single resource by ID
router.get('/:id', (req, res) => {
  const resourceId = req.params.id;

  // Validation: ID should be a number (dummy logic for now)
  if (isNaN(resourceId)) {
    return res.status(400).json({ error: "Invalid resource ID format" });
  }

  // Dummy resource if id = 1
  if (resourceId == 1) {
    return res.status(200).json({ id: 1, name: "Community Food Pantry", category: "food" });
  } else {
    return res.status(404).json({ error: "Resource not found" });
  }
});

//  POST a new resource
router.post('/', (req, res) => {
  const { name, category, location, contact } = req.body;

  // Validation: required fields
  if (!name || !category) {
    return res.status(400).json({ error: "Name and category are required" });
  }

  // Dummy success response
  res.status(201).json({
    message: "Resource added successfully",
    resource: { id: Date.now(), name, category, location, contact }
  });
});

//  PATCH verify resource
router.patch('/:id/verify', (req, res) => {
  const resourceId = req.params.id;

  if (isNaN(resourceId)) {
    return res.status(400).json({ error: "Invalid resource ID format" });
  }

  // Dummy success response
  res.status(200).json({ message: "Resource verified", verifiedCount: 1 });
});

//  PATCH flag resource
router.patch('/:id/flag', (req, res) => {
  const resourceId = req.params.id;

  if (isNaN(resourceId)) {
    return res.status(400).json({ error: "Invalid resource ID format" });
  }

  // Dummy success response
  res.status(200).json({ message: "Resource flagged", flaggedCount: 1 });
});

//  DELETE a resource
router.delete('/:id', (req, res) => {
  const resourceId = req.params.id;

  if (isNaN(resourceId)) {
    return res.status(400).json({ error: "Invalid resource ID format" });
  }

  // Dummy delete success
  res.status(200).json({ message: "Resource deleted successfully" });
});

module.exports = router;