const { Router } = require("express");
const express = require("express");
const router = express.Router();
const pool = require("../../db");

// POST
router.post("/", async (req, res) => {
  try {
    const { title, date, time, description, contact, long, lat } = req.body;
    const geog = `POINT(${long} ${lat})`;

    const event = await pool.query(
      "INSERT INTO events (title, date, time, description, contact, geog) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, date, time, description, contact, ST_X(ST_TRANSFORM(geog::geometry, 4326)) AS lat, ST_Y(ST_TRANSFORM(geog::geometry, 4326)) AS long",
      [title, date, time, description, contact, geog]
    );

    res.status(201).json(event.rows[0]);
  } catch (err) {
    res.status(400).send("400 - Bad request");
    console.error(err.message);
  }
});

// GET
router.get("/", async (req, res) => {
  try {
    const { title, long, lat, radius } = req.query || null;

    let query =
      "SELECT id, title, date, time, description, contact, ST_X(ST_TRANSFORM(geog::geometry, 4326)) AS lat, ST_Y(ST_TRANSFORM(geog::geometry, 4326)) AS long FROM events";
    let queryVars = [];

    if (title && radius == undefined) {
      queryVars.push(title);
      query += ` WHERE title ILIKE '%' || $${queryVars.length} || '%'`;
    }
    if (long && radius == undefined) {
      queryVars.push(long);
      query += ` ${
        queryVars.length == 1 ? "WHERE" : "AND"
      } ST_X(ST_TRANSFORM(geog::geometry, 4326)) = $${queryVars.length}`;
    }
    if (lat && radius == undefined) {
      queryVars.push(lat);
      query += ` ${
        queryVars.length == 1 ? "WHERE" : "AND"
      } ST_Y(ST_TRANSFORM(geog::geometry, 4326)) = $${queryVars.length}`;
    }
    if (radius) {
      queryVars.push(radius);
      query += ` ${
        queryVars.length == 1 ? "WHERE" : "AND"
      } ST_DistanceSphere(geog::geometry, ST_MakePoint(${long},${lat})) <= $${
        queryVars.length
      } * 1609.34`;
    }

    const events = await pool.query(query, queryVars);
    res.json(events.rows);
  } catch (err) {
    res.status(400).send("400 - Bad request");
    console.error(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = await pool.query(
      "SELECT id, title, date, time, description, contact, ST_X(ST_TRANSFORM(geog::geometry, 4326)) AS lat, ST_Y(ST_TRANSFORM(geog::geometry, 4326)) AS long FROM events WHERE id = $1",
      [id]
    );

    res.json(event.rows[0]);
  } catch (err) {
    res.status(400).send("400 - Bad request");
    console.error(err.message);
  }
});

module.exports = router;
