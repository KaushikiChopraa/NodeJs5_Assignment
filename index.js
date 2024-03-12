require("dotenv").config();
const express = require("express");
const connection = require("./src/dbConfig/dbConfig");
const routes = require("./src/routes/userRoutes");

const app = express();

connection()
app.use(express.json());


app.use("/", routes);

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`))