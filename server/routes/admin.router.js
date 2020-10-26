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

router.put("/edititem", rejectUnauthenticated, (req, res) => {

    const {qty, id} = req.body;
    // setting query text to update the username
    const queryText = 'UPDATE "item" SET qty=$1 WHERE id=$2';

    pool.query(queryText, [qty, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
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
module.exports = router;