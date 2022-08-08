import { query } from "../index.js";
import { user } from "../scripts/libs/user.js";

async function populateUserTable() {
  for (let i = 0; i < user.length; i++) {
    const res = await query(
      `INSERT INTO users (user_id, username) VALUES ($1, $2);`,
      [user[i].user_id, user[i].username]
    );
    console.log(`${res.command} : populated user table`);
  }
}

populateUserTable();
