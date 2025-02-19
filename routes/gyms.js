var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET all gyms */
router.get("/", async function (req, res, next) {
  try {
    // console.log("GET /api/gyms route hit");
    const results = await db("SELECT * FROM gyms ORDER BY id ASC;");
    // console.log("Query results:", results);

    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

const treatGymData = (data) => {
  const response = {
    id: data[0].id,
    name: data[0].name,
    address: data[0].address,
    city: data[0].city,
    province_state: data[0].province_state,
    country: data[0].country,
    latitude: data[0].latitude,
    longitude: data[0].longitude,
    instagram: data[0].instagram,
    website: data[0].website,
    drop_in_fee: data[0].drop_in_fee,
    description: data[0].description,
    reviews: [],
  };

  data.forEach((review) => {
    response.reviews.push({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
    });
  });
  return response;
};

// GET gym by id
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      `SELECT gyms.*, reviews.rating, reviews.comment, reviews.id AS review_id FROM gyms LEFT JOIN reviews ON gyms.id = reviews.gym_id WHERE gyms.id = ${id};`
    );
    res.send(results[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET gyms by city
router.get("/city/:city", async function (req, res, next) {
  const { city } = req.params;
  try {
    const results = await db(`SELECT * FROM gyms WHERE city = "${city}";`);
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET gyms by province/state
router.get("/province_state/:province_state", async function (req, res, next) {
  const { province_state } = req.params;
  try {
    const results = await db(
      `SELECT * FROM gyms WHERE province_state = "${province_state}";`
    );
    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new gym
router.post("/", async function (req, res, next) {
  const {
    name,
    address,
    city,
    province_state,
    country,
    latitude,
    longitude,
    instagram,
    website,
    drop_in_fee,
    description,
  } = req.body;
  try {
    const results = await db(
      `INSERT INTO gyms (name, address, city, province_state, country, latitude, longitude, instagram, website, drop_in_fee, description) VALUES ("${name}", "${address}", "${city}", "${province_state}", "${country}", ${latitude}, ${longitude}, "${instagram}", "${website}", "${drop_in_fee}", "${description}");`
    );
    const newGym = await db(
      `SELECT * FROM gyms WHERE id = ${results.insertId};`
    );
    res.status(201).send(newGym[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// PUT update gym by id
router.put("/:id", async function (req, res, next) {
  const { id } = req.params;
  const {
    name,
    address,
    city,
    province_state,
    country,
    latitude,
    longitude,
    instagram,
    website,
    drop_in_fee,
    description,
  } = req.body;
  try {
    await db(
      `UPDATE gyms SET name = "${name}", address = "${address}", city = "${city}", province_state = "${province_state}", country = "${country}", latitude = ${latitude}, longitude = ${longitude}, instagram = "${instagram}", website = "${website}", drop_in_fee = "${drop_in_fee}", description = "${description}" WHERE id = ${id};`
    );
    const updatedGym = await db(`SELECT * FROM gyms WHERE id = ${id};`);
    res.send(updatedGym[0]);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// DELETE gym by id
router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    await db(`DELETE FROM gyms WHERE id = ${id};`);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
