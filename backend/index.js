import express from "express";
import cors from "cors";
import pool from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app
  .route("/signup")

  .post((req, res) => {
    //before transformation pipeline
    const reqbodyusername = req.body.username;

    // after transformation pipeline
    const username = reqbodyusername.toLowerCase();

    const userpassword = req.body.password;

    if (!username) {
      return res.status(422).json({
        success: false,
        message: "username is required",
      });
    }

    if (username.length < 5 || username.length === 0 || username.length > 50) {
      return res.status(422).json({
        message: "Username must be of 5 character and not greater than 50",
      });
    }

    if (/\d/.test(username) || username.includes(" ")) {
      return res.status(422).json({
        message: "Username should not contains any numbers and spaces",
      });
    }

    if (!userpassword) {
      return res.status(422).json({
        success: false,
        message: "Password Required",
      });
    }

    if (userpassword.length < 8) {
      return res.status(422).json({
        message: "Password Must be of 8 characters",
      });
    }

    bcrypt
      .hash(userpassword, 12)

      .then((hashedpassword) => {
        async function DBQuery() {
          try {
            await pool.query(
              "INSERT INTO users (username,password) VALUES ($1,$2)",
              [username, hashedpassword],
            );

            return res.status(201).json({
              message: "Signup Sucessfull",
            });
          } catch (error) {
            if (error.code === "23505") {
              return res.json({
                success: false,
                message: "Username alredy taken",
              });
            }

            console.log(error.message);
            return res.status(500).json({
              success: false,
              message: "Server Error",
            });
          }
        }

        DBQuery();
      }) // .then  ends here

      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: "Server Error",
        });
      });

    // catch ends here
  }); // signup route ends here

app
  .route("/login")

  .post((req, res) => {
    const username = req.body.username.toLowerCase();
    const plainpassword = req.body.password;

    async function DBQuery() {
      try {
        const result = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [username],
        );

        if (result.rowCount === 0) {
          return res.status(404).json({
            success: false,
            message: "Username dosen't exists",
          });
        }

        const userid = result.rows[0].userid;

        const hashedpassword = result.rows[0].password;
        const matched = await bcrypt.compare(plainpassword, hashedpassword);

        if (!matched) {
          return res.status(401).json({
            success: false,
            message: "Username or password didnt matched",
          });
        }

        if (matched) {
          const token = jwt.sign(
            { username: username, userid: userid },
            process.env.JWTSEC,
            { expiresIn: "2h" },
          );

          res.cookie("jwt", token);
          res.json({
            success: true,
            message: "Logged In Sucessfull",
          });
        }
      } catch (error) {
        console.log(error.message);
        return res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    } // db query function ends here

    DBQuery();
  });

const jwtvalidation = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Session Expired Try to Login Again",
    });
  }

  jwt.verify(token, process.env.JWTSEC, (err, matched) => {
    if (err) {
      console.log(err.message);
      return res.status(401).json({
        success: false,
        message: "Invalid token try to login again",
      });
    }

    if (!matched) {
      return res.status(401).json({
        success: false,
        message: "Couldnot verify token try to login again",
      });
    }

    req.user = matched;
    return next();
  });
};

app
  .route("/notes")

  .post(jwtvalidation, (req, res) => {
    const userid = req.user.userid;
    const notetitle = req.body.title;
    const notecontent = req.body.content;

    if (notetitle.length > 50) {
      return res.json({
        success: false,
        message: "Title shouldnt contain more than 50 characters",
      });
    }

    async function DBQuery() {
      try {
        await pool.query(
          "INSERT INTO usernotes (userid , title , content) VALUES ($1,$2,$3)",
          [userid, notetitle, notecontent],
        );

        return res.status(201).json({
          success: true,
          message: "Noted added Sucessfully",
        });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    }
    DBQuery();
  })

  .get(jwtvalidation, (req, res) => {
    const userid = req.user.userid;

    async function DBQuery() {
      try {
        const result = await pool.query(
          "SELECT * FROM usernotes WHERE userid = ($1)",
          [userid],
        );

        if (result.rowCount === 0) {
          return res.status(204).json({
            success: false,
            message: "Notes not added yet try adding some notes",
          });
        } // if blocks ends here

        return res.json({
          success: true,
          message: result.rows,
        });
      } catch (error) {
        console.log(error.message);
        res.json({
          success: false,
          message: "Server Error",
        });
      }
    }

    DBQuery();
  });

  

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
