import {  Pool} from "pg";

export const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'usuario',
    database:'bd_turismo',
    port:5432
})