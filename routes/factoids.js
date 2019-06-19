const express = require("express");
const router = express.Router();

const factoidController = require("../controllers/factoidController")

router.get("/factoids", factoidController.index);
router.post('/factoids/create', factoidController.create);
router.post("/factoids/:id/destroy", factoidController.destroy);

module.exports = router;
