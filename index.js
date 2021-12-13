const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// router
const AdminRoutes = require("./routes/router.admin");

dotenv.config();
app.use(express.json());
app.use(cors());

// routes

app.use("/api/admin", AdminRoutes);

// connect to the database
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("We are now connected to the Database");
});

//listening port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is running to port ${port}...`);
});
