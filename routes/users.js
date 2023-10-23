const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

router.use(express.json());

router.get("/", async (req, res) => {
  const users = await User.findAll();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});

router.post(
  "/",
  [
    check("name").not().isEmpty().trim(),
    check("name").trim().isLength({ min: 5, max: 15 }),
    check("age").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const newUser = await User.create({
        name: req.body.name,
        age: Number(req.body.age),
      });
      res.send(newUser);
    }
  }
);

router.put(
  "/:id",
  [
    check("name").not().isEmpty().trim(),
    check("name").trim().isLength({ min: 5, max: 15 }),
    check("age").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const user = await User.findByPk(req.params.id);
      const updatedUser = await user.update({
        name: req.body.name,
        age: Number(req.body.age),
      });
      res.send(updatedUser);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  const deletedUser = await user.destroy();
  res.send(deletedUser);
});

module.exports = router;
