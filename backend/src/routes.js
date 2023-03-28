const express = require("express");
const router = express.Router();
const usersController = require("./controlles/users.model");

// Retrieve all products
router.get("/", usersController.findAll);

// Create a new product
router.post("/", usersController.create);

// Retrieve a single product with id
router.get("/:id", usersController.findById);

// Update a product with id
router.put("/:id", usersController.update);

// Delete a product with id
router.delete("/:id", usersController.delete);

module.exports = router;
