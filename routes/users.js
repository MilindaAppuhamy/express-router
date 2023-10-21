const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.use(express.json());

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.post("/", async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    age: req.body.age,
  });
  res.send(newUser);
});

router.put("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const updatedUser = await user.update({
    name: req.body.name,
    age: req.body.age,
  });
  res.send(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const deletedUser = await user.destroy();
  res.send(deletedUser);
});

module.exports = router;
