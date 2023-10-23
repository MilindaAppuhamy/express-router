const express = require("express");
const router = express.Router();
const Fruit = require("../models/Fruit");
const { check, validationResult } = require("express-validator");

router.use(express.json());

router.get("/", async (req, res) => {
  const fruits = await Fruit.findAll();
  res.send(fruits);
});

router.get("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  res.send(fruit);
});

router.post(
  "/",
  [
    check("color").not().isEmpty().trim(),
    check("name").not().isEmpty().trim(),
    check("name").trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array() });
    } else {
      const newFruit = await Fruit.create({
        name: req.body.name,
        color: req.body.color,
      });
      res.send(newFruit);
    }
  }
);

router.put(
  "/:id",
  [
    check("color").not().isEmpty().trim(),
    check("name").not().isEmpty().trim(),
    check("name").trim().isLength({ min: 5, max: 20 }),
  ],
  async (req, res) => {
    const fruit = await Fruit.findByPk(req.params.id);
    const updatedFruit = await fruit.update({
      name: req.body.name,
      color: req.body.color,
    });
    res.send(updatedFruit);
  }
);

router.delete("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  const deletedFruit = await fruit.destroy();
  res.send(deletedFruit);
});

module.exports = router;
