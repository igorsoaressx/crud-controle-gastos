

const { Pool } = require('pg');

// Verifica se esta em produção 
const isProduction = process.env.NODE_ENV === 'production';

// URL Do pgadmin
const connectionString = 'postgresql://user_gastos:b44OrBJ2G5Gcm6bjotjVyY0VN68ZCJHA@dpg-d3tcjj75r7bs73en0mf0-a.oregon-postgres.render.com/db_gasto';

let pool;

if (isProduction) {
  
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
  });
} else {
 
  pool = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false,
    }
  });
}

module.exports = { pool };