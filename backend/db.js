import {Pool} from "pg"
import "dotenv/config"

// console.log({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({


    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
    
    

})

export default pool;