const express = require("express");
const path = require("path");

const app = express(); // Create an instance of the express application
const PORT = 3000; // Define the port number

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "build")));

// Handle GET requests to the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html")); // Send the index.html file as the response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Log a message when the server starts
});
