import express from 'express';

import pool from '../config/db.js';

const router =
  express.Router();


router.get(
  '/',
  async (req, res, next) => {
    try {
      const [states] =
        await pool.execute(
          `SELECT
            id,
            name,
            code,
            type,
            capital,
            description,
            image_url
           FROM states
           ORDER BY name`
        );

      res.json({
        success: true,
        count: states.length,
        states
      });

    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/:id',
  async (req, res, next) => {
    try {
      const [states] =
        await pool.execute(
          `SELECT
            id,
            name,
            code,
            type,
            capital,
            description,
            image_url
           FROM states
           WHERE id = ?`,
          [req.params.id]
        );

      if (states.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'State not found'
        });
      }

      res.json({
        success: true,
        state: states[0]
      });

    } catch (error) {
      next(error);
    }
  }
);


export default router;