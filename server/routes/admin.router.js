const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

router.delete("/deleteitem/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "item" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.get("/itemlist", rejectUnauthenticated, (req, res) => {
  console.log("We are about to get the item list");

  const queryText = `SELECT * FROM "item";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on item query ${error}`);
      res.sendStatus(500);
    });
});

//GETs a list of all the admins found in the admin table
router.get('/adminlist', rejectUnauthenticated, (req, res) => {
    console.log('We are about to get the admin list');

    const queryText = `SELECT * FROM admin;`;
    pool.query(queryText)
        .then((result) => {
            //console.log('Here is the admin list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on admin query ${error}`);
            res.sendStatus(500);
        });

});

router.get('/calc', rejectUnauthenticated, (req, res) => {
    console.log('running the calculations for entries');
    const queryText = 'CALL calc()';
    pool.query(queryText)
    .then((result) => { //if everything goes well, these new calculations are put into the open_transaction table
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error running the calculations', error);
        res.sendStatus(500);
    });
});

//////////////////////// Grabs everything from open_transaction table which has all the calculated values ////////////////////////
router.get('/pending', rejectUnauthenticated, (req, res) => {
    console.log('Grabbing all pending transactions');
    const queryText = 'SELECT * FROM open_transaction'
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows).status(200);
    }).catch((error)=> {
        console.log('Problem with grabbing pending transactions')
        res.sendStatus(500);
    });
});
/////////////////////// Run the function to confirm all the totals and pushes it into history to store records//////////////////////

router.get('/confirm', rejectUnauthenticated, (req, res) => {
    console.log('Finalizing transactions');
    const queryText = 'CALL confirm()'; //this is run when the admin clicks the 'confirm payroll' button on the open_transaction componnent
    pool.query(queryText)
    .then((result) => {
        res.sendStatus(200)
    }).catch((error) => {
        console.log('error pushing to history records', error);
        res.sendStatus(500);
    });
});

//this is used if a certain item from open_transaction is needed to be deleted
//mainly for testing purposes
//With how the app runs, open_transaction gets emptied everytime a new payroll is ran
//i.e. open_transaction is only there to 'bridge the gap' between checking entries and submitting them
router.delete("/:id", rejectUnauthenticated, (req, res) => {
    pool
      .query('DELETE FROM "open_transaction" WHERE id=$1', [req.params.id])
      .then((result) => {
        res.sendStatus(204); //No Content
      })
      .catch((error) => {
        console.log("Error DELETE ", error);
        res.sendStatus(500);
      });
  });
module.exports = router;