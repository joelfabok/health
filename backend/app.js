const express = require("express");

const app = express();
const createConnection = require("./db");
const connection = createConnection();
app.use(express.json());
const cors = require("cors");

app.use(cors());

connection.connect((error) => {
  if (error) {
    console.error("Failed to connect to MySQL database:", error);
    return;
  }

  console.log("Connected to MySQL database");
});
app.options("*", cors());
// Create a new user
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;

  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, password];

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
  const { username, email, password } = req.body;

  const sql =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  const values = [username, email, password, id];

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
connection.query(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (id)
    );
  `,
  (error, results, fields) => {
    if (error) {
      console.error("Error creating users table:", error);
    } else {
      console.log("Users table created (if it didn't exist).");
    }
  }
);

const port = process.env.REACT_APP_SERVERPORT;

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
