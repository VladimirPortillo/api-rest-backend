import {  Pool} from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "bd_turismo_fn",
  port: 5432,
});
