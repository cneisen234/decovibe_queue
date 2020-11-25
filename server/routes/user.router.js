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
const axios = require("axios");
const moment = require('moment');
require("dotenv").config();

let storeHash = process.env.STORE_HASH

let twoweeks = moment().subtract(2, "weeks")


let config = {
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};
router.delete("/deletecompleterange", rejectUnauthenticated, (req, res) => {
 pool
   .query('DELETE FROM "complete" WHERE timestamp<=$1', [twoweeks])
   .then((result) => {
     res.sendStatus(204); //No Content
   })
   .catch((error) => {
     console.log("Error DELETE ", error);
     res.sendStatus(500);
   });
})
let orderID = 0
let prevOrderID = 0

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

// router.post("/addnewitem", (req, res, next) => {
  // const order = req.body.order
  setInterval(() => {
      let nowMonth = Number(moment().month()) + 1;
      let prevMonth = Number(moment().subtract(1, "month").month()) + 1;
      let nowYear = Number(moment().year());
      let prevYear = Number(moment().year());
      let nowDay = Number(moment().date());
      let prevDay = Number(moment().subtract(30, "days").date());
      let hour = Number(moment().hour());
      let min = Number(moment().minute());
      let sec = Number(moment().second());
      if (hour < 10) {
        hour = "0" + String(hour);
      }
      if (min < 10) {
        min = "0" + String(min);
      }
      if (sec < 10) {
        sec = "0" + String(sec);
      }
      if (nowMonth === 1) {
        prevYear = moment().year() - 1;
      }
    axios
      .get(
        `https://api.bigcommerce.com/stores/${storeHash}/v2/orders?sort=date_created:desc&limit=1`,
        config
      )
      .then(function (response) {
        let order = response.data[0];
        let email = order.billing_address.email;
        let first_name = order.billing_address.first_name;
        let last_name = order.billing_address.last_name;
        // handle success
        if (response.data !== []) {
          let normalHour = Number(hour);
          let AmPm = "am";
          if (normalHour > 12) {
            AmPm = "pm";
            normalHour = normalHour - 12;
          } else if (normalHour === 12) {
            AmPm = "pm";
          } else if (normalHour === 00) {
            AmPm = "am";
            normalHour = 12;
          }
          // console.log("this is the response", response.data);
          orderID = response.data[0].id;
          console.log(response.data[0].id);
          let dateString = `Date: ${nowMonth}/${nowDay}/${nowYear} Time: ${normalHour}:${min}:${sec}${AmPm}`;
          console.log("this is orderID", orderID);
          console.log("this is prevOrderID", prevOrderID);
          console.log(
            "prev date",
            `${prevYear}-${prevMonth}-${prevDay}T${hour}:${min}:${sec}`
          );
          console.log(
            "current date",
            `${nowYear}-${nowMonth}-${nowDay}T${hour}:${min}:${sec}`
          );
          if (orderID !== prevOrderID) {
            console.log("new order incoming");
            prevOrderID = response.data[0].id;
            axios
              .get(
                `${response.data[0].products.url}`,
                config
              )
              .then(function (response) {
                // handle success
                if (response.data !== []) {
                  let data = response.data;
                  for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let options = element.product_options;
                    let qty = element.quantity;
                    let optionsArray = [];
                    let orderComments = [];
                    let basePrice = Number(element.base_price).toFixed(2);
                    let name = element.name;
                    let decoSku = element.sku;
                    let decoSku2 = decoSku.slice(0, 2);
                    let decoSku3 = decoSku.slice(0, 6);
                    let decoSku4 = decoSku.slice(0, 5);
                    let decoSku5 = decoSku.slice(0, 3);
                    let decoSku6 = decoSku.slice(0, 8);
                    if (
                      decoSku2 === "CD" ||
                      decoSku2 === "CS" ||
                      decoSku2 === "SD" ||
                      decoSku3 === "CUSTOM" ||
                      decoSku3 === "SUBKIT" ||
                      decoSku6 === "SETUPFEE" ||
                      decoSku5 === "SP-" ||
                      decoSku5 === "CP-"
                    ) {
                      let counter = 0;
                      let product_length = "";
                      for (let j = 0; j < options.length; j++) {
                        const opt = options[j];
                        let display_name = opt.display_name;
                        let checkName = display_name.slice(0, 10);
                        let checkName2 = display_name.slice(0, 18);
                        if (checkName === "Sheet Size") {
                          counter++;
                          optionsArray.push(
                            `${checkName}: ${opt.display_value}`
                          );
                        } else if (display_name === "Length") {
                          product_length = opt.display_value;
                          console.log("this is product_length", product_length);
                        } else if (display_name === "Order Comments") {
                          orderComments.push(
                            `${opt.display_name}: ${opt.display_value}`
                          );
                        } else if (checkName2 === "Garment Type/Color") {
                          counter++;
                          optionsArray.push(
                            `${checkName2}: ${opt.display_value}`
                          );
                        } else if (display_name === "Upload File") {
                          console.log("skipping upload file");
                        } else {
                          counter++;
                          optionsArray.push(
                            `${opt.display_name}: ${opt.display_value}`
                          );
                        }
                      }
                      counter = 0;
                      let optionsJoined = optionsArray.join();
                      let commentsJoined = orderComments.join();
                      console.log("customer email", email);
                      console.log("this is the order ID", orderID);
                      console.log("product name", name);
                      console.log("optionsJoined", optionsJoined);
                      console.log("commentsJoined", commentsJoined);
                      console.log("sku for order", decoSku);
                      console.log("basePrice", basePrice);
                      const query2Text =
                        'INSERT INTO "item" (email, first_name, last_name, order_number, sku, qty, product_length, product_options, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
                      pool.query(query2Text, [
                        email,
                        first_name,
                        last_name,
                        orderID,
                        decoSku,
                        qty,
                        product_length,
                        optionsJoined,
                        dateString,
                      ]);
                      optionsArray = [];
                      orderComments = [];
                    } else if (
                      decoSku4 === "BL_A3" ||
                      decoSku4 === "BL_A4" ||
                      decoSku4 === "BL_A5" ||
                      decoSku4 === "BL_LC" ||
                      decoSku4 === "BL_SM" ||
                      decoSku3 === "HW_CAP" ||
                      decoSku3 === "PR_BAG" ||
                      decoSku3 === "PR_UM_" ||
                      decoSku4 === "SB_A5" ||
                      decoSku4 === "SB_A4" ||
                      decoSku4 === "SB_A3" ||
                      decoSku4 === "SB_LC" ||
                      decoSku4 === "SB_SM" ||
                      decoSku4 === "SB_LS" ||
                      decoSku4 === "WE_SM" ||
                      decoSku4 === "WE_LC" ||
                      decoSku4 === "WE_A5" ||
                      decoSku4 === "WE_A4" ||
                      decoSku4 === "WE_A3" ||
                      decoSku3 === "DYESUB" ||
                      decoSku4 === "FINAL"
                    ) {
                      console.log("custom sku", decoSku);
                    } else {
                      console.log("not a decovibe sku", decoSku);
                    }
                  }
                }
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              });
          }
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, 3000);

router.post("/starttask", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const order_number = req.body.order_number;
  const sku = req.body.sku;
  const product_length = req.body.product_length;
  const product_options = req.body.product_options;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;

  const query2Text =
    'INSERT INTO "progress" (email, first_name, last_name, order_number, sku, product_length, product_options, qty, assigned, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
  pool
    .query(query2Text, [
      email,
      first_name,
      last_name,
      order_number,
      sku,
      product_length,
      product_options,
      qty,
      assigned,
      created_at,
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

router.post("/markcomplete", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const order_number = req.body.order_number;
  const sku = req.body.sku;
  const product_length = req.body.product_length;
  const product_options = req.body.product_options;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;

  //now lets add admin information to the user table
  const query2Text =
    'INSERT INTO "complete" (email, first_name, last_name, order_number, sku, product_length, product_options, qty, assigned, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
  pool
    .query(query2Text, [
      email,
      first_name,
      last_name,
      order_number,
      sku,
      product_length,
      product_options,
      qty,
      assigned,
      created_at,
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

  //now lets add admin information to the user table
  const query2Text =
    'INSERT INTO "user" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id';
  pool
    .query(query2Text, [first_name, last_name, email, password])
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
    .catch((error) => console.log(error));
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
