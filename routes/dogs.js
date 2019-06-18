const express = require("express");
const router = express.Router();

const dogController = require("../controllers/dogController")

router.get("/dogs", dogController.index);

module.exports = router;
