const express = require("express");
const dbConnect = require("./config/connect");
const cors = require("cors");
const path = require('path');
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

// routes
app.use('/api/users', require('./routes/userRoute'))
app.use('/api/books', require('./routes/bookRoute'))
app.use('/api/favoriteList', require('./routes/favoritesRoute'))

// Prepare For Production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(
    `Server Is Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`
  )
);
