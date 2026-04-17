const express = require("express");
const app = express();
require("dotenv").config();
const candidatesRoutes = require("./routes/candidateRoutes");

app.use(express.json());
app.use("/", candidatesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running at PORT:", PORT);
});