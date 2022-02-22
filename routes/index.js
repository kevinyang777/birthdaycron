const express = require("express");
const controller = require("../controllers/index.js");
const router = express.Router();
router.post("/register", (req, res) => {
  controller.user.createUser(req, res);
});
router.put("/update/:id", (req, res) => {
  controller.user.updateUser(req, res);
});

router.delete("/delete/:id", (req, res) => {
  controller.user.deleteUser(req, res);
});

module.exports = router;
