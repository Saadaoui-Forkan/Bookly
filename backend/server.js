const express = require("express");
const dbConnect = require("./config/connect");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// connection to db
dbConnect();

// init app
const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server Is Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`
  )
);