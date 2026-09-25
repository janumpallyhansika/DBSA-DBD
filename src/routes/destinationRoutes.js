import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/* =========================================
   GET ALL DESTINATIONS
   GET /api/destinations
========================================= */

router.get("/", async (req, res) => {
  try {
    const {
      state_id,
      category,
      search
    } = req.query;

    let sql = `
      SELECT
        d.id,
        d.name,
        d.city,
        d.category,
        d.description,
        d.latitude,
        d.longitude,
        d.best_time,
        d.image_url,

        s.id AS state_id,
        s.name AS state_name,
        s.code AS state_code

      FROM destinations d

      INNER JOIN states s
        ON s.id = d.state_id

      WHERE 1 = 1
    `;

    const params = [];


    /* Filter by state */

    if (state_id) {
      sql += `
        AND d.state_id = ?
      `;

      params.push(state_id);
    }


    /* Filter by category */

    if (category) {
      sql += `
        AND d.category = ?
      `;

      params.push(category);
    }


    /* Search */

    if (search) {
      sql += `
        AND (
          d.name LIKE ?
          OR d.city LIKE ?
          OR d.description LIKE ?
        )
      `;

      const searchValue = `%${search}%`;

      params.push(
        searchValue,
        searchValue,
        searchValue
      );
    }


    sql += `
      ORDER BY d.name ASC
    `;


    const [destinations] =
      await pool.execute(
        sql,
        params
      );


    res.json({
      success: true,
      count: destinations.length,
      destinations
    });

  } catch (error) {

    console.error(
      "Get destinations error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch destinations",
      error: error.message
    });
  }
});


/* =========================================
   GET DESTINATIONS BY STATE
   GET /api/destinations/state/:stateId
========================================= */

router.get(
  "/state/:stateId",
  async (req, res) => {

    try {

      const { stateId } =
        req.params;


      const [destinations] =
        await pool.execute(
          `
          SELECT
            d.id,
            d.name,
            d.city,
            d.category,
            d.description,
            d.latitude,
            d.longitude,
            d.best_time,
            d.image_url,

            s.id AS state_id,
            s.name AS state_name,
            s.code AS state_code

          FROM destinations d

          INNER JOIN states s
            ON s.id = d.state_id

          WHERE d.state_id = ?

          ORDER BY d.name ASC
          `,
          [stateId]
        );


      res.json({
        success: true,
        count: destinations.length,
        destinations
      });

    } catch (error) {

      console.error(
        "Get state destinations error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch state destinations",
        error: error.message
      });
    }
  }
);


/* =========================================
   GET ONE DESTINATION
   GET /api/destinations/:id
========================================= */

router.get(
  "/:id",
  async (req, res) => {

    try {

      const { id } =
        req.params;


      const [destinations] =
        await pool.execute(
          `
          SELECT
            d.id,
            d.name,
            d.city,
            d.category,
            d.description,
            d.latitude,
            d.longitude,
            d.best_time,
            d.image_url,

            s.id AS state_id,
            s.name AS state_name,
            s.code AS state_code

          FROM destinations d

          INNER JOIN states s
            ON s.id = d.state_id

          WHERE d.id = ?

          LIMIT 1
          `,
          [id]
        );


      if (destinations.length === 0) {

        return res.status(404).json({
          success: false,
          message:
            "Destination not found"
        });

      }


      res.json({
        success: true,
        destination:
          destinations[0]
      });

    } catch (error) {

      console.error(
        "Get destination error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch destination",
        error: error.message
      });
    }
  }
);


export default router;