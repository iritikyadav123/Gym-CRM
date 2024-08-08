const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./DB/connectdb");
const webRoutes = require("./Routes/web");

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.use("/", webRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
