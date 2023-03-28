const express = require("express");

const app = express();
const createConnection = require("./db.js");
const connection = createConnection();

connection.connect((error) => {
  if (error) {
    console.error("Failed to connect to MySQL database:", error);
    return;
  }

  console.log("Connected to MySQL database");
});

// Create a new user
app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Failed to create user:", error);
      res.status(500).send("Failed to create user");
      return;
    }

    res.send("User created successfully");
  });
});

// Get a user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM users WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Failed to get user:", error);
      res.status(500).send("Failed to get user");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.send(result[0]);
  });
});

// Update a user by ID
app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  const values = [name, email, password, id];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Failed to update user:", error);
      res.status(500).send("Failed to update user");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.send("User updated successfully");
  });
});

// Delete a user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM users WHERE id = ?";
  const values = [id];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Failed to delete user:", error);
      res.status(500).send("Failed to delete user");
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
      return;
    }

    res.send("User deleted successfully");
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
