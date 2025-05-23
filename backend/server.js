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
    origin: [
      "http://localhost:3000",
      "https://bookly-eight.vercel.app",
    ],
    credentials: true, 
  })
);

// routes
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/books', require('./routes/bookRoute'))
app.use('/api/favoriteList', require('./routes/favoritesRoute'))

// running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server Is Running in Mode on Port ${PORT}`
  )     
);
