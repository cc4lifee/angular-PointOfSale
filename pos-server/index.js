const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");

// Create the Express server
const app = express();

// Configure CORS
app.use(cors());

// Public folder
app.use(express.static("public"));

// Read and parse the body
app.use(express.json());

// Database connection
dbConnection();


// Routes
app.use("/api/login", require("./routes/auth.route"));
app.use("/api/users", require("./routes/users.route"));
app.use("/api/products", require("./routes/products.route"));
app.use("/api/categories", require("./routes/categories.route"));
app.use("/api/suppliers", require("./routes/suppliers.route"));
app.use("/api/sales", require("./routes/sales.route"));
app.use("/api/clients", require("./routes/clients.route"));
app.use("/api/employees", require("./routes/employees.route"));
app.use("/api/orders", require("./routes/orders.route"));
app.use("/api/transactions", require("./routes/transactions.route"));
app.use("/api/searches", require("./routes/searches.route"));

// Uncomment if needed in the future
// app.use("/api/upload", require("./routes/uploads"));

// Initialize server only if not in test mode
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});

// Export the application for testing
module.exports = app;
