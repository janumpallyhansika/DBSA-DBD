import pool from '../config/db.js';

export const getAllDestinations = async () => {
  const [rows] = await pool.execute(
    `SELECT
      d.id,
      d.name,
      d.city,
      d.category,
      d.description,
      d.latitude,
      d.longitude,
      d.image_url,
      d.estimated_hours,
      d.best_time,
      s.id AS state_id,
      s.name AS state_name,
      s.code AS state_code
     FROM destinations d
     INNER JOIN states s
       ON d.state_id = s.id
     ORDER BY s.name, d.name`
  );

  return rows;
};

export const getDestinationsByState = async (stateId) => {
  const [rows] = await pool.execute(
    `SELECT
      id,
      state_id,
      name,
      city,
      category,
      description,
      latitude,
      longitude,
      image_url,
      estimated_hours,
      best_time
     FROM destinations
     WHERE state_id = ?
     ORDER BY name`,
    [stateId]
  );

  return rows;
};

export const getDestinationById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT
      d.*,
      s.name AS state_name,
      s.code AS state_code
     FROM destinations d
     INNER JOIN states s
       ON d.state_id = s.id
     WHERE d.id = ?`,
    [id]
  );

  return rows[0] || null;
};

export const searchDestinations = async (search) => {
  const keyword = `%${search}%`;

  const [rows] = await pool.execute(
    `SELECT
      d.*,
      s.name AS state_name,
      s.code AS state_code
     FROM destinations d
     INNER JOIN states s
       ON d.state_id = s.id
     WHERE
       d.name LIKE ?
       OR d.city LIKE ?
       OR d.category LIKE ?
       OR s.name LIKE ?
     ORDER BY d.name`,
    [keyword, keyword, keyword, keyword]
  );

  return rows;
};