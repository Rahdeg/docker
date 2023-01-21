require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

app.get("/test", (req, res) => {
    res.status(200).json({ msg: "Welcome to the api docker project test mode" });
  });

  app.listen(port, ()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
});