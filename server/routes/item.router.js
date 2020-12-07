const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");

let config = {
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};

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

router.delete("/deletehistory/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "history" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.delete("/deletecustomitem/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "customitem" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.delete("/deleterespond/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "customerrespond" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.delete("/deleteprogress/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "progress" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.delete("/deletecomplete/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "complete" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.delete("/deletecompleteall", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "complete"')
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error DELETE ", error);
      res.sendStatus(500);
    });
});

router.put("/customassign", rejectUnauthenticated, (req, res) => {
  const { assigned, id } = req.body;
  // setting query text to update the username
  const queryText = 'UPDATE "customitem" SET assigned=$1 WHERE id=$2';

  pool
    .query(queryText, [assigned, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.put("/assign", rejectUnauthenticated, (req, res) => {

    const {assigned, id} = req.body;
    // setting query text to update the username
    const queryText = 'UPDATE "item" SET assigned=$1 WHERE id=$2';

    pool.query(queryText, [assigned, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.get("/itemlist", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "item" ORDER BY sku;`;
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

router.get("/historylist", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT array_agg(DISTINCT email) as email, array_agg(DISTINCT first_name) as first_name, array_agg(DISTINCT last_name) as last_name FROM "history" GROUP BY email`;
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

router.post("/checkhistory", (req, res) => {
  let email = req.body.email;
  console.log("this is the email", email);
  const queryText =
    `SELECT * from "history" where email=$1;`
  pool
    .query(queryText, [email])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on item query ${error}`);
      res.sendStatus(500);
    });
});

router.get("/customitemlist", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "customitem" ORDER BY sku;`;
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

router.get("/itemlistcount", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT count(*) FROM "item"`;
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

router.get("/customitemlistcount", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT count(*) FROM "customitem"`;
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

router.get("/progresslist", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "progress" ORDER BY sku;`;
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

router.get("/progresslistcount", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT count(*) FROM "progress";`;
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

router.get("/confirmlist", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "customerconfirm" ORDER BY sku;`;
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

router.get("/confirmlistcount", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT count(*) FROM "customerconfirm";`;
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

router.get("/respondlist", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "customerrespond" ORDER BY sku;`;
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

router.get("/respondlistcount", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT count(*) FROM "customerrespond";`;
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

router.get("/completelist", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT * FROM "complete" ORDER BY sku;`;
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

router.get("/completelistcount", rejectUnauthenticated, (req, res) => {

  const queryText = `SELECT count(*) FROM "complete";`;
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

router.post("/orderdetails", (req, res) => {
  let order_number = req.body.order_number;
  console.log("this is the payload before it reaches the get", order_number);
  axios
    .get(
      `https://api.bigcommerce.com/stores/et4qthkygq/v2/orders/${order_number}/products`,
      config
    )
    .then(function (response) {
      console.log("this is the response", response.data);

      res.send(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

module.exports = router;