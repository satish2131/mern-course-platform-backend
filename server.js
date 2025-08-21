const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ add this
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/courses", require("./routes/courses"));
app.use("/api/users", require("./routes/users"));
app.use("/api/certificates", require("./routes/certificates"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  // Make sure your frontend build is inside backend folder: /frontend/build
  app.use(express.static(path.join(__dirname, "frontend", "build")));

  // Serve index.html for all unknown routes (React routing)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
