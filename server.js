const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Configura la conexión a la base de datos de Render
const pool = new Pool({
  user: 'render_db_user',
  host: 'render_db_host',
  database: 'render_db_name',
  password: 'render_db_password',
  port: 5432, // El puerto generalmente es 5432 para PostgreSQL
});

app.get('/data', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM tu_tabla');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los datos' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
