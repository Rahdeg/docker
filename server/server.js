require("dotenv").config();
const express = require("express");
const { connectDatabase } = require("./database/database");
const {Error} = require("./middleware/errormiddleware");
const LibraryError = require("./utils/libraryError");

process.on("uncaughtException", (error) => {
  console.log("Uncaught Exception..... 💣 🔥 stopping the server....");
  console.log(error.name, error.message);

  process.exit(1);
});


const app = express();
connectDatabase(app);
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    res.status(200).json({ msg: "Welcome to the api docker project test mode" });
  });


app.all("*", (req, res, next) => {
    next(
        new LibraryError(`Can't find ${req.originalUrl} on this server!`, 404)
    );
});

app.use(ErrorsMiddleware);

const server = app.listen(
  port,
  console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);

// Unhandled Rejection
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection..... 💣 🔥   stopping the server....");
  console.log(error.name, error.message);
  server.close(() => {
      // exit code 1 means that there is an issue that caused the program to exit
      process.exit(1);
  });
});