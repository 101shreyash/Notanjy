import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";

const app = express();
const port = 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app
  .route("/signup")

  .post((req, res) => {

    const username = req.body.username;
    const userpassword = req.body.password;

    if (!username) {

      return  res.status(422).json({
          success : false,
        message : "username is required"

      })
        
    }

    if (username.length <5 || username.length === 0 || username.length >50 ) {

       return  res.status(422).json({
        message : "Username must be of 5 character and not greater than 50"
        
       })
        
    }

    if (/\d/.test(username) || username.includes(" ")) {

        return res.status(422).json({
            message : "Username should not contains any numbers and spaces"
        })
             
    }

    if (!userpassword) {

        return res.status(422).json({
            success : false,
            message : "Password Required"

        })
        
    }

    if (userpassword.length <8) {

        return res.status(422).json({
            message : "Password Must be of 8 characters"
        })
        
    }
    

    bcrypt
      .hash(userpassword, 12)

      .then((hashedpassword) => {
        async function DBQuery() {
          try {
            const result = await pool.query(
              "INSERT INTO users (username,password) VALUES ($1,$2)",
              [username, hashedpassword],
            );

            return res.status(201).json({
              message: "Signup Sucessfull",
            });
          } catch (error) {
            console.log(error.message);

            return res.status(500).json({
              success: false,
              message: "Server Error",
            });
          }
        }

        DBQuery();

      }) // .then  ends here 

      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });
    // catch ends here


  }); // signup route ends here

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
