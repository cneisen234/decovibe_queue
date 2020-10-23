const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const sgMail = require("@sendgrid/mail");
let crypto = require("crypto");
const router = express.Router();
const moment = require('moment');
require("dotenv").config();

//NOTE that some routes were brought in from the project template
//this route deals with users logging in and authicating them (i.e. do they exist in the database?)

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

//POST or create the email that is sent off to admins if they wish to reset their password
//(without logging in)
router.post("/forgot/admin/:token/:email", (req, res) => {
  let email = req.body.username;
    let token = crypto.randomBytes(16).toString("hex");
    const queryText = `UPDATE "admin" SET token=$1 WHERE email=$2 `;
    pool
      .query(queryText, [token, email])
      .then((result) => {
        const query2Text = `UPDATE "user" SET token=$1 WHERE email=$2 `;
        pool
          .query(query2Text, [token, email])
          .then(() => { //set up information to be sent off inside email
              sgMail.setApiKey(process.env.SENDGRID_API_KEY);
               let domain = process.env.DOMAIN_NAME;
              const msg = {
                to: email,
                from: "no.reply.legacyfoundation@gmail.com",
                subject: "request to reset password",
                html: `
  <div>
  <div style="background-color:black;"><img
        src="https://legacychildrensfoundation.com/wp-content/uploads/2020/04/LCFLogo_H_RGB_kp.jpg"
       width="150"
      /></div>
  <h2 style="text-align:center;">Click below to reset your password</h2>
  <p style="text-align:center;"><a href="${domain}/#/forgotpassword/${token}/${email}" style="text-align:center;">Reset Password</a></p>
  <p style="text-align:center;">If you did not request this email, please disregard it and delete it.</p>
  </div>
  `,
              };
              sgMail.send(msg);
            res.status(201).send(result.rows)})
          .catch(function (error) {
            console.log("Sorry, there was an error with your query: ", error);
            res.sendStatus(500); // HTTP SERVER ERROR
          });
      })
      .catch(function (error) {
        console.log("Sorry, there is an error", error);
        res.sendStatus(500);
      });

});

router.post("/addnewitem", (req, res, next) => {
  // pull out the incoming object data
  const brand = req.body.brand;
  const sku = req.body.sku;
  const sku_description = req.body.sku_description;
  const qty = req.body.qty;

  console.log(brand, sku, sku_description, qty)

  //now lets add admin information to the user table
  const query2Text =
    'INSERT INTO "item" (brand, sku, sku_description, qty ) VALUES ($1, $2, $3, $4) RETURNING id';
  pool
    .query(query2Text, [brand, sku, sku_description, qty])
    .then((result) => res.status(201).send(result.rows))
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    })

    .catch(function (error) {
      console.log("Sorry, there is an error", error);
      res.sendStatus(500);
    });
});



//Handles POST to add a new admin
//The password is encrypted before being inserted into the database
router.post("/addadmin", (req, res, next) => {

  // pull out the incoming object data
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const created_at = req.body.created_at;
  const role = req.body.role;
  lcf_id = null;

      //now lets add admin information to the user table
      const query2Text =
        'INSERT INTO "user" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
      pool
        .query(query2Text, [
         first_name,
         last_name,
         email,
         password,
        ])
        .then((result) => res.status(201).send(result.rows))
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        })
    
    .catch(function (error) {
      console.log("Sorry, there is an error", error);
      res.sendStatus(500);
    });
});



////////////ROUTE BELOW IS PART OF TEMPLATE AND REMAINS HERE IN CASE OF OPEN REGISTRATION BEING NEEDED//////////
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post("/register", rejectUnauthenticated, (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText =
    'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING id';
  pool
    .query(queryText, [email, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
});/////////////////////////////////////////////////////////////////////////////////////////

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  console.log("logging body", req.body.username)
  const email = req.body.username;
  // setting query text to update the username
  const queryText = `update "user" set "last_login" = NOW() WHERE "email"=$1`;

  pool.query(queryText, [email]).then((result) => {//when someone logs in, want to capture the time they log in

      res.sendStatus(201)
  });
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});



//PUT or updates the admin password from 'reset password' tab admin side
router.put(`/adminpasswordreset/:admin_id`, rejectUnauthenticated, (req, res) => {
  console.log('we are about to change the admin password:', req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const adminID = req.params.admin_id;
  const email = req.body.email;
  // setting query text to update the username
  const queryText = `UPDATE "admin" SET password=$1 WHERE id=$2 `;

  pool
    .query(queryText, [newPassword, adminID])
    .then((result) => {
      console.log("Success in updating password or email!");

      const query2Text = `UPDATE "user" SET password=$1 WHERE admin_id=$2`;
      const queryValue = [newPassword, adminID];
      pool
        .query(query2Text, queryValue)
             .then(() => res.status(201).send(result.rows))
          .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });
      
    })
    .catch((error) => {
      console.log(`Error on PUT with query ${error}`);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});
// end PUT




//route used to deal with forgot password for admins and creates token for them
router.put(`/passwordforgot/admin`, (req, res) => {
  console.log("we are about to change the admin password:", req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const token = req.body.token;
  // setting query text to update the username
  const queryText = `UPDATE "admin" SET password=$1 WHERE token=$2 `;

  pool
    .query(queryText, [newPassword, token])
    .then((result) => {
      console.log("Success in updating password or email for admin!");

      const query2Text = `UPDATE "user" SET password=$1 WHERE token=$2`;
      const queryValue = [newPassword, token];
      pool
        .query(query2Text, queryValue)
        .then(() => res.sendStatus(201).res.send(result.rows))
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });
    })
    .catch((error) => {
      console.log(`Error on PUT with query ${error}`);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});



module.exports = router;
