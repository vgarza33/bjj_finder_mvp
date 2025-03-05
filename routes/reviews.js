var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const userShouldBeLoggedIn = require("../middleware/userShouldBeLoggedIn");

// all the routes start with /api/reviews

// GET all reviews for a gym
// "/api/reviews/1"
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
router.post("/gym/:gym_id", userShouldBeLoggedIn, async function (req, res, next) {
  const { rating, comment } = req.body;
  const { gym_id } = req.params;
  const user_id = req.user_id; // Get the user_id from the request object set by middleware
  try {
    const results = await db(
      `INSERT INTO reviews (rating, comment, gym_id, user_id) VALUES (${rating}, "${comment}", ${gym_id}, ${user_id});`
    );
    console.log(results);
    console.log(results.insertId);
    //why insert.Id?
    const newReview = await db(
      `SELECT * FROM reviews WHERE id = ${results.insertId};`
    );
    res.status(201).send(newReview[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT update review
// make sure to update a review they added
router.put("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  const { rating, comment } = req.body;
  try {
    //is this variable needed?
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
// make sure they can only delete a review they added
router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {
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
