var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all reviews for a gym
router.get("/:gym_id", async function (req, res, next) {
  const { gym_id } = req.params;
  try {
    const results = await db(`SELECT * FROM reviews WHERE gym_id = ${gym_id};`);
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new review
router.post("/", async function (req, res, next) {
  const { rating, comment, gym_id } = req.body;
  try {
    const results = await db(
      `INSERT INTO reviews (rating, comment, gym_id) VALUES (${rating}, "${comment}", ${gym_id});`
    );
    const newReview = await db(
      `SELECT * FROM reviews WHERE id = ${results.insertId};`
    );
    res.status(201).send(newReview[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT update review
router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    const results = await db(
      `UPDATE reviews SET rating = ${rating}, comment = "${comment}" WHERE id = ${id};`
    );
    const updatedReview = await db(`SELECT * FROM reviews WHERE id = ${id};`);
    if (updatedReview.length === 0) {
      res.status(404).send({ error: "Review not found" });
      return;
    } else {
      res.send(updatedReview[0]);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE review
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`DELETE FROM reviews WHERE id = ${id};`);
    if (results.affectedRows === 0) {
      res.status(404).send({ error: "Review not found" });
      return;
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
