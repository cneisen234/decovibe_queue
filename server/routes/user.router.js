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

//POST or sends out an email to a student and gives them a token so they can temporarily log in
router.post("/forgot/:token/:email", (req, res) => {
  let email = req.body.username
  let token = crypto.randomBytes(16).toString("hex");
  const queryText = `UPDATE "student" SET token=$1 WHERE student_email=$2 `;
    pool
      .query(queryText, [token, email])
      .then((result) => {
        const query2Text =
          `UPDATE "user" SET token=$1 WHERE email=$2 `;
        pool
          .query(query2Text, [
      token, email
          ])
          .then(() => { //set up information sent off in email to student
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
            res.status(201).send(result.rows)
          })

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



//Handles POST to add a new admin
//The password is encrypted before being inserted into the database
router.post("/addadmin", rejectUnauthenticated, (req, res, next) => {

  // pull out the incoming object data
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);
  const created_at = req.body.created_at;
  const role = req.body.role;
  lcf_id = null;

  //initialize the id you will get from the student
  let admin_id = "";

  const queryText = `INSERT INTO "admin" 
                (first_name, last_name, email, password, role, created_at)
                VALUES($1, $2, $3, $4, $5, $6) RETURNING id `;
  pool
    .query(queryText, [
      first_name,
      last_name,
      email,
      password,
      role,
      created_at,
    ])
    .then((result) => {
      console.log("this is the response", result.rows[0].id);
      //res.status(201).send(result.rows[0]);

      admin_id = result.rows[0].id;
      //now lets add admin information to the user table
      const query2Text =
        'INSERT INTO "user" (admin_id, lcf_id, email, password, role, last_login) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
      pool
        .query(query2Text, [
          admin_id,
          lcf_id,
          email,
          password,
          role,
          new Date(),
        ])
        .then(() => res.status(201).send(result.rows))
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


//Handles POST to the student table to add a new student
//The password is encrypted before being inserted into the database
router.post("/addstudent", rejectUnauthenticated, (req, res, next) => {

  // pull out the incoming object data
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const school_id = req.body.school_id || 0;
  const grade = Number(req.body.grade);
  const grad_year = req.body.grad_year;
  const last_login = null;
  const school_attend = req.body.school_attend;
  const lcf_id = req.body.lcf_id;
  const lcf_start_date = req.body.lcf_start_date;
  const student_email = req.body.student_email;
  const password = encryptLib.encryptPassword(req.body.password);
  const password2 = req.body.password;
  const pif_amount = Number(req.body.pif_amount).toFixed(2);
  const savings = Number(req.body.savings).toFixed(2);
  const created_at = moment.utc().format();
  const role = "student";
  const inactive = "no";
  const strikes = 0;
  const balance_due = 0; //just created an account, so no balance due
  admin_id = null;

  //initialize the id you will get from the student
  //let lcf_id = "";

  const queryText = `INSERT INTO "student" 
                (lcf_id, first_name, last_name, school_attend, school_id, student_email, password, grade, grad_year, last_login, created_at,   lcf_start_date, role,   pif_amount, savings, strikes, inactive, balance_due)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING lcf_id `;
  pool
    .query(queryText, [
      lcf_id,
      first_name,
      last_name,
      school_attend,
      school_id,
      student_email,
      password,
      grade,
      grad_year,
      last_login,
      created_at,
      lcf_start_date,
      role,
      pif_amount,
      savings,
      strikes,
      inactive,
      balance_due
    ])
    .then((result) => {
      //now lets add student information to the user table
      const query2Text =
        'INSERT INTO "user" (lcf_id, admin_id, email, password, role, last_login) VALUES ($1, $2, $3, $4, $5, $6)';
      pool
        .query(query2Text, [
          lcf_id,
          null,
          student_email,
          password,
          'student',
          new Date(),
        ])
        .then(() => { //upon adding a new student, want email to be automatically sent out prompting the student how to login
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            let domain = process.env.DOMAIN_NAME;
            const msg = {
              to: student_email,
              from: "no.reply.legacyfoundation@gmail.com",
              subject: "Welcome!",
              html: `
  <div>
  <div style="background-color:black;"><img
        src="https://legacychildrensfoundation.com/wp-content/uploads/2020/04/LCFLogo_H_RGB_kp.jpg"
       width="150"
      /></div>
  <h2 style="text-align:center;">Welcome ${first_name}!</h2>
  <p style="text-align:center;">Your temporary password is <b>${password2}</b>, please login to your account and reset your password</p>
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

router.put("/checktrip", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const lcf_id = req.body.lcf_id;
  const trip = req.body.trip;
  

  //initialize the id you will get from the student
  //let lcf_id = "";
  console.log(lcf_id, trip)
  const queryText = `UPDATE "student" SET trip=$2 WHERE lcf_id =$1`;
  pool
    .query(queryText, [
      lcf_id,
      trip,
    ]).catch(function (error) {
      console.log("Sorry, there is an error", error);
      res.sendStatus(500);
    });
});

router.put("/checkpaid", rejectUnauthenticated, (req, res, next) => {
  //initialize the id you will get from the student
  //let lcf_id = "";
  const queryText = `UPDATE history SET did_we_pay = ( CASE WHEN (total = 0) THEN 'no' ELSE  'yes' END )`;
  pool.query(queryText).catch(function (error) {
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
    const query2Text = `UPDATE "student" SET "last_login" = NOW() WHERE "student_email"=$1`;
    pool
      .query(query2Text, [email])
      .then(() => res.sendStatus(201))
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




//PUT or update the student password via the 'reset password' tab student side
router.put(`/studentpasswordreset/:lcf_id`, rejectUnauthenticated, (req, res) => {
  console.log('we are about to change the student password:', req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const studentID = req.params.lcf_id;
  const email = req.body.email;
  // setting query text to update the username
  const queryText = `UPDATE "student" SET password=$1 WHERE lcf_id=$2 `;

  pool
    .query(queryText, [newPassword, studentID])
    .then((result) => {
      console.log("Success in updating password or email for student!");
//need double insert since pasword is found within user and student table
      const query2Text = `UPDATE "user" SET password=$1 WHERE lcf_id=$2`;
      const queryValue = [newPassword, studentID];
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
      console.log(studentID);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});
// end PUT

//Router used to reset student password and creates token for student
router.put(`/passwordforgot`, (req, res) => {
  console.log("we are about to change the student password:", req.body);
  const newPassword = encryptLib.encryptPassword(req.body.password);
  const email = req.body.email;
  const token = req.body.token;
  // setting query text to update the username
  const queryText = `UPDATE "student" SET password=$1 WHERE token=$2 `;

  pool
    .query(queryText, [newPassword, token])
    .then((result) => {
      console.log("Success in updating password or email for student!");

      const query2Text = `UPDATE "user" SET password=$1 WHERE token=$2`;
      const queryValue = [newPassword, token];
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
      console.log(studentID);
      res.sendStatus(500); // if there is an error, send server error 500
    });
});

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

//DELETEs student from student table based off lcf_id
//USED FOR TESTING PURPOSES
//Ideally, all students are only 'soft deleted' or in this app, deactivated
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "student" "user" WHERE lcf_id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE /api/order", error);
      res.sendStatus(500);
    });
});


module.exports = router;
