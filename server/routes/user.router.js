const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
let crypto = require("crypto");
const router = express.Router();
const axios = require("axios");
const moment = require('moment');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
require("dotenv").config();
const fs = require("fs");

let storeHash = process.env.STORE_HASH

let daterange = moment().subtract(6, "hours").subtract(30, "days");
let daterange2 = moment().subtract(6, "hours").subtract(60, "days");


let config = {
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};
router.delete("/deletecompleterange", rejectUnauthenticated, (req, res) => {
 pool
   .query('DELETE FROM "complete" WHERE timestamp<=$1', [daterange])
   .then((result) => {
     res.sendStatus(204); //No Content
   })
   .catch((error) => {
     console.log("Error DELETE ", error);
     res.sendStatus(500);
   });
})
router.delete("/deletehistoryrange", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "history" WHERE timestamp<=$1', [daterange2])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});
let orderID = 0
let prevOrderID = 0

//NOTE that some routes were brought in from the project template
//this route deals with users logging in and authicating them (i.e. do they exist in the database?)

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

  setInterval(() => {
      let nowMonth = Number(moment().subtract(6, "hours").month()) + 1;
      let nowYear = Number(moment().subtract(6, "hours").year());
      let prevYear = Number(moment().subtract(6, "hours").year());
      let nowDay = Number(moment().subtract(6, "hours").date());
      let hour = Number(moment().subtract(6, "hours").hour());
      let min = Number(moment().subtract(6, "hours").minute());
      let sec = Number(moment().subtract(6, "hours").second());
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
                    let decoSku7 = decoSku.slice(0, 7);
                    if (
                      decoSku5 === "CD1" ||
                      decoSku5 === "CD2" ||
                      decoSku5 === "CD3" ||
                      decoSku5 === "CD4" ||
                      decoSku5 === "CD5" ||
                      decoSku5 === "CD6" ||
                      decoSku5 === "CD7" ||
                      decoSku5 === "CD8" ||
                      decoSku5 === "CD9" ||
                      decoSku5 === "CS1" ||
                      decoSku5 === "CS2" ||
                      decoSku5 === "CS3" ||
                      decoSku5 === "CS4" ||
                      decoSku5 === "CS5" ||
                      decoSku5 === "CS6" ||
                      decoSku5 === "CS7" ||
                      decoSku5 === "CS8" ||
                      decoSku5 === "CS9" ||
                      decoSku5 === "SD1" ||
                      decoSku5 === "SD2" ||
                      decoSku5 === "SD3" ||
                      decoSku5 === "SD4" ||
                      decoSku5 === "SD5" ||
                      decoSku5 === "SD6" ||
                      decoSku5 === "SD7" ||
                      decoSku5 === "SD8" ||
                      decoSku5 === "SD9" ||
                      decoSku3 === "CUSTOM" ||
                      decoSku3 === "SUBKIT" ||
                      decoSku6 === "SETUPFEE" ||
                      decoSku3 === "SISER-" ||
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
                        'INSERT INTO "item" (email, first_name, last_name, order_number, sku, qty, product_length, product_options, created_at, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id';
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
                        name,
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
                      decoSku7 === "DYESUB-" ||
                      decoSku4 === "FINAL"
                    ) {
                      console.log("custom order email", email);
                      console.log("custom sku", decoSku);
                      console.log("custom order first name", first_name);
                      console.log("custom order first name", last_name);
                      console.log("custom order number", orderID);
                      console.log("custom order qty", qty);
                      console.log("custom order created at", dateString);
                      const query2Text =
                        'INSERT INTO "customitem" (email, first_name, last_name, order_number, sku, qty, created_at, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id';
                      pool.query(query2Text, [
                        email,
                        first_name,
                        last_name,
                        orderID,
                        decoSku,
                        qty,
                        dateString,
                        name,
                      ]);
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
  }, 1000);

router.post("/starttask", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const order_number = req.body.order_number;
  const sku = req.body.sku;
  const description = req.body.description;
  const product_length = req.body.product_length;
  const product_options = req.body.product_options;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;
  const priority = req.body.priority;

  const query2Text =
    'INSERT INTO "progress" (email, first_name, last_name, order_number, sku, product_length, product_options, qty, assigned, created_at, description, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
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
      description,
      priority,
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

router.post("/gobacknew", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const order_number = req.body.order_number;
  const sku = req.body.sku;
  const description = req.body.description;
  const product_length = req.body.product_length;
  const product_options = req.body.product_options;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;
  const priority = req.body.priority;

  const query2Text =
    'INSERT INTO "item" (email, first_name, last_name, order_number, sku, product_length, product_options, qty, assigned, created_at, description, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
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
      description,
      priority
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

router.post("/customerresponse", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  let approve = req.body.approve
  let comments = req.body.comments;
  let token = req.body.token;
                       let nowMonth =
                         Number(moment().subtract(6, "hours").month()) + 1;
                       let nowYear = Number(
                         moment().subtract(6, "hours").year()
                       );
                       let prevYear = Number(
                         moment().subtract(6, "hours").year()
                       );
                       let nowDay = Number(
                         moment().subtract(6, "hours").date()
                       );
                       let hour = Number(moment().subtract(6, "hours").hour());
                       let min = Number(moment().subtract(6, "hours").minute());
                       let sec = Number(moment().subtract(6, "hours").second());
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
                       let comment_made_at = `Date: ${nowMonth}/${nowDay}/${nowYear} Time: ${normalHour}:${min}:${sec}${AmPm}`;

  const queryText = pool
    .query(`SELECT * FROM "customerconfirm" WHERE token='${token}'`)
    .then((result) => {
      email = result.rows[0].email;
      first_name = result.rows[0].first_name;
      last_name = result.rows[0].last_name;
      order_number = result.rows[0].order_number;
      sku = result.rows[0].sku;
      description = result.rows[0].description;
      qty = result.rows[0].qty;
      assigned = result.rows[0].assigned;
      created_at = result.rows[0].created_at;
      priority = result.rows[0].priority;

      const query2Text =
        'INSERT INTO "customerrespond" (email, first_name, last_name, order_number, sku, qty, assigned, approve, comments, created_at, token, description, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id';
      pool
        .query(query2Text, [
          email,
          first_name,
          last_name,
          order_number,
          sku,
          qty,
          assigned,
          approve,
          comments,
          created_at,
          token,
          description,
          priority,
        ])
         const query3Text =
        'INSERT INTO "history" (email, first_name, last_name, order_number, sku, qty, assigned, comment_made_at, customercomments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
      pool
        .query(query3Text, [
          email,
          first_name,
          last_name,
          order_number,
          sku,
          qty,
          assigned,
          comment_made_at,
          comments,
        ])
        .then((result) => res.status(201).send(result.rows))
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        })

        .catch(function (error) {
          console.log("Sorry, there is an error", error);
          res.sendStatus(500);
        })
        .then((result) => {
          res.status(201).send(result.rows)
            const query4Text = `DELETE FROM "customerconfirm" WHERE token=$1`;
            pool
              .query(query4Text, [token])
              .then((result) => res.sendStatus(201))
              .catch(function (error) {
                console.log(
                  "Sorry, there was an error with your query: ",
                  error
                );
                res.sendStatus(500); // HTTP SERVER ERROR
              });
        })
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        })

         

             .catch(function (error) {
               console.log("Sorry, there is an error", error);
               res.sendStatus(500);
             });
    });
});

router.post("/customerconfirm", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const order_number = req.body.order_number;
  const sku = req.body.sku;
  const description = req.body.description;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;
  const pic1 = req.body.pic1;
  const pic2 = req.body.pic2;
  const pic3 = req.body.pic3;
  const pic4 = req.body.pic4;
  const pic5 = req.body.pic5;
  const pic6 = req.body.pic6;
  const pic7 = req.body.pic7;
  const pic8 = req.body.pic8;
  const pic9 = req.body.pic9;
  const pic10 = req.body.pic10;
  const pic11 = req.body.pic11;
  const pic12 = req.body.pic12;
  const pic13 = req.body.pic13;
  const pic14 = req.body.pic14;
  const pic15 = req.body.pic15;
  const pic16 = req.body.pic16;
  const pic17 = req.body.pic17;
  const pic18 = req.body.pic18;
  const pic19 = req.body.pic19;
  const pic20 = req.body.pic20;
  const comments = req.body.comments;
  const priority = req.body.priority;
  let token = crypto.randomBytes(16).toString("hex");
          let nowMonth = Number(moment().subtract(6, "hours").month()) + 1;
          let nowYear = Number(moment().subtract(6, "hours").year());
          let prevYear = Number(moment().subtract(6, "hours").year());
          let nowDay = Number(moment().subtract(6, "hours").date());
          let hour = Number(moment().subtract(6, "hours").hour());
          let min = Number(moment().subtract(6, "hours").minute());
          let sec = Number(moment().subtract(6, "hours").second());
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
          let comment_made_at = `Date: ${nowMonth}/${nowDay}/${nowYear} Time: ${normalHour}:${min}:${sec}${AmPm}`;
  const pic = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20]

axios
                 .get(
                   `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${order_number}/products`,
                   config
                 )
                 .then(function (response) {
                   // handle success
                   if (response.data !== []) {
                     let titleString = `  <div><img
        src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
       width="150"
      /></div>
                     <div>Please confirm the details below for your recent custom order</div>,<br><br>
<div><b>Order number:</b> ${order_number} <br><br>`;
                       let commentsString = `
<div><b>Comments from the art department:</b> <br><br>
${comments}</div><br><br>
<div><b>After you've reviewed your artwork please click the link below to approve it.</b></div><br><br>
  <div><a style="font-size:30px; text-decoration: none;" href="http://localhost:3000/#/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kqF/${token}">Click to Continue</a></div><br><br>`; 
                     let array = response.data;
                     let newArray = [];
                     let optionsArray = [];
                     for (let index = 0; index < array.length; index++) {
                       const element = array[index];
                        if (sku == element.sku) {
                          newArray.push(
                            `<div><b>Details of your original order are listed below</b></div><br><br><div><b>Item Name:</b> ${element.name}</div>`
                          );
                          let options = element.product_options;
                          for (let j = 0; j < options.length; j++) {
                            const opt = options[j];
                            optionsArray.push(
                              `<div><b>${opt.display_name}:</b> ${opt.display_value}</div>`
                            );
                          }
                          let optionsJoined = optionsArray.join();
                          newArray.push(optionsJoined);
                          optionsArray = [];
              
                          newArray.push(
                            `<p><b>Please click the link to view your artwork in a PDF: </b></p><a style="font-size:30px; text-decoration: none;" href=${
                              pic[index]
                            }>View Proof ${index + 1}</a><br><br>
                             <div><a style="font-size:30px; text-decoration: none;" href="http://localhost:3000/#/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kqF/${token}">Click to Approve</a></div>`
                          );
   newArray.push("<br><br> --------------------------------------------");
                        }

                     }

                     let joinedArray = newArray.join();
                     let finalArray =
                       `<div style="margin-left:50px;">` +
                       titleString +
                       commentsString +
                       joinedArray +
                       `</div>`;
                     newArray = [];
                     console.log(finalArray);

 const msg = {
   personalizations: [
     {
       to: [
         {
           email: email,
         },
       ],
       bcc: [
         {
           email: "chris.neisen@heattransferwarehouse.com",
         },
       ],
     },
   ],
   from: "sales@heattransferwarehouse.com", // Use the email address or domain you verified above
   subject: `Please confirm details for your order: ${order_number}`,
   html: finalArray,
 };
 (async () => {
   try {
     await sgMail.send(msg);
   } catch (error) {
     console.error(error);

     if (error.response) {
       console.error(error.response.body);
     }
   }
 })();
}
})

  const query2Text =
    'INSERT INTO "customerconfirm" (email, first_name, last_name, order_number, sku, qty, assigned, created_at, upload_url1, upload_url2, upload_url3, upload_url4, upload_url5, upload_url6, upload_url7, upload_url8, upload_url9, upload_url10, upload_url11, upload_url12, upload_url13, upload_url14, upload_url15, upload_url16, upload_url17, upload_url18, upload_url19, upload_url20, comments, token, description, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32) RETURNING id';
  pool
    .query(query2Text, [
      email,
      first_name,
      last_name,
      order_number,
      sku,
      qty,
      assigned,
      created_at,
      pic1,
      pic2,
      pic3,
      pic4,
      pic5,
      pic6,
      pic7,
      pic8,
      pic9,
      pic10,
      pic11,
      pic12,
      pic13,
      pic14,
      pic15,
      pic16,
      pic17,
      pic18,
      pic19,
      pic20,
      comments,
      token,
      description,
      priority,
    ])

      const query3Text =
        'INSERT INTO "history" (email, first_name, last_name, order_number, sku, qty, assigned, comment_made_at, admincomments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id';
      pool
        .query(query3Text, [
          email,
          first_name,
          last_name,
          order_number,
          sku,
          qty,
          assigned,
          comment_made_at,
          comments,
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
  const description = req.body.description;
  const product_length = req.body.product_length;
  const product_options = req.body.product_options;
  const qty = req.body.qty;
  const assigned = req.body.assigned;
  const created_at = req.body.created_at;
  const priority = req.body.priority;

  //now lets add admin information to the user table
  const query2Text =
    'INSERT INTO "complete" (email, first_name, last_name, order_number, sku, product_length, product_options, qty, assigned, created_at, description, priority) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
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
      description,
      priority,
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

router.post("/canned", rejectUnauthenticated, (req, res, next) => {
  // pull out the incoming object data
  const canned = req.body.canned;


  //now lets add admin information to the user table
  const query2Text =
    'INSERT INTO "replies" (reply) VALUES ($1) RETURNING id';
  pool
    .query(query2Text, [
      canned
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
