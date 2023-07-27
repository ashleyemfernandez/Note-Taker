const express = require('express');
const path = require ("path");
const app = express();
const PORT = process.env.PORT || 3002;

const apiRoutes = require("./routes/apiRoute");
const htmlRoutes = require("./routes/htmlRoute");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});