import pg from "pg";
import "dotenv/config";

const connectionString = process.env.PG_URL;
const poolConfig = {
  connectionString,
  ssl: { rejectUnauthorized: false },
};

export const pool = new pg.Pool(poolConfig);

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}

// beforeAll((done) => {
//   done();
// });
// afterAll((done) => {
//   pool.end();
//   done();
// });
