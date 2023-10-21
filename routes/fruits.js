const express = require("express");
const router = express.Router();
const Fruit = require("../models/Fruit");

router.use(express.json());

router.get("/", async (req, res) => {
  const fruits = await Fruit.findAll();
  res.send(fruits);
});

router.get("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  res.send(fruit);
});

router.post("/", async (req, res) => {
  const newFruit = await Fruit.create({
    name: req.body.name,
    color: req.body.color,
  });
  res.send(newFruit);
});

router.put("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  const updatedFruit = await fruit.update({
    name: req.body.name,
    color: req.body.color,
  });
  res.send(updatedFruit);
});

router.delete("/:id", async (req, res) => {
  const fruit = await Fruit.findByPk(req.params.id);
  const deletedFruit = await fruit.destroy();
  res.send(deletedFruit);
});

module.exports = router;
