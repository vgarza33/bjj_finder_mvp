var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const userShouldBeLoggedIn = require("../middleware/userShouldBeLoggedIn");

// all the routes start with /api/gyms

/* GET all gyms */
// "/api/gyms"
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

// GET gym by id with reviews
// "/api/gyms/1"
router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(
      `SELECT gyms.*, reviews.rating, reviews.comment, reviews.id AS review_id FROM gyms LEFT JOIN reviews ON gyms.id = reviews.gym_id WHERE gyms.id = ${id};`
    );

    if (results.length === 0) {
      return res.status(404).send({ error: "Gym not found" });
    }

    const gymWithReviews = treatGymData(results);
    res.send(gymWithReviews);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET gyms by city
// "/api/gyms/city/seoul"
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

// GET gyms by country
// api/gyms/country/france
router.get("/country/:country", async function (req, res, next) {
  const { country } = req.params;
  try {
    const results = await db(
      `SELECT * FROM gyms WHERE country = "${country}";`
    );

    if (results.length === 0) {
      return res.status(404).send({ error: "No gyms found in this country" });
    }

    res.send(results);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST new gym
// "/api/gyms"
router.post("/", userShouldBeLoggedIn, async function (req, res, next) {
  const {
    name,
    address,
    city,
    province_state = null,
    country,
    latitude = null,
    longitude = null,
    instagram = null,
    website = null,
    drop_in_fee = null,
    description = null,
  } = req.body;

  const user_id = req.user_id; // Get the user_id from the request object set by middleware

  try {
    const results = await db(
      `INSERT INTO gyms (
      name, address, city, province_state, country, latitude, longitude, instagram, website, drop_in_fee, description, user_id) 
      VALUES (
      "${name}", 
      "${address}", 
      "${city}", 
      ${province_state ? `"${province_state}"` : "NULL"},  
      "${country}", 
       ${latitude !== null ? latitude : "NULL"}, 
       ${longitude !== null ? longitude : "NULL"}, 
       ${instagram ? `"${instagram}"` : "NULL"}, 
       ${website ? `"${website}"` : "NULL"}, 
       ${drop_in_fee ? `"${drop_in_fee}"` : "NULL"}, 
       ${description ? `"${description}"` : "NULL"}, 
      ${user_id});`
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
// make sure they can edit their own review
router.put("/:id", userShouldBeLoggedIn, async function (req, res, next) {
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
// make sure they can only delete a gym they added
router.delete("/:id", userShouldBeLoggedIn, async function (req, res, next) {
  const { id } = req.params;
  try {
    await db(`DELETE FROM gyms WHERE id = ${id};`);
    res.status(204).send();
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
