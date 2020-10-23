const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//This route deals with charges being made to the student and retreiving pst charges from the database

//Adds a new charge made by the admin to the "charge_student" table
router.post("/", rejectUnauthenticated, (req, res) => {
    // HTTP REQUEST BODY
    const charge = req.body; // pull the object out out of the HTTP REQUEST
    const {
      lcf_id,
      admin_id,
      date,
      type,
      description,
      amount
    } = charge;
    if (charge === undefined) {
        // stop, dont touch the database
        res.sendStatus(400); // 400 BAD REQUEST
        return;
    }
    //Double insert (charge table as well as student table)
    //this will create a new row for a charge in the "charge_student" table
    const queryText = `

        INSERT INTO "charge_student" (lcf_id, admin_id, date, type, description, amount) 
        VALUES ($1, $2, $3, $4, $5, $6);`; //grabs database

    pool
      .query(queryText, [
        lcf_id,
        admin_id,
        date,
        type,
        description,
        amount
      ])
      .then((result) => {
        const query2Text =
        'UPDATE "student" SET balance_due=$1+balance_due WHERE lcf_id=$2'; 
        //Charge is added to balance_due attached to the student so it can be viewed on the student home list
      pool
        .query(query2Text, [
          amount,
          lcf_id
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


module.exports = router;