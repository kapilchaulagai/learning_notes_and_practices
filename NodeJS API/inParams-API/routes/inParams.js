const express = require("express");
const router = express.Router();

router.get("/randomJson/:param", (req, res, next) => {
  let param = req.params["param"];
  let header = req.headers["Content-Type"];

  res.status(200).json({ name: "Kapil", age: 18 });
});

router.get("/search", (req, res, next) => {
  console.log(req.query?.query);
  res.status(200).json({ message: "Request recieved", name: "Kapil", age: 18 });
});

module.exports = router;
