const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require("axios");

let config = {
  //authenticate Big Commerce API
  headers: {
    "X-Auth-Client": process.env.BG_AUTH_CLIENT,
    "X-Auth-Token": process.env.BG_AUTH_TOKEN,
  },
};

const {
  //login verification middleware
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

router.delete("/deleteitem/:id", rejectUnauthenticated, (req, res) => {
  //api to delete new stock orders
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
  //api to delete conversation history
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
  //api to delete new custom items
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
  //api to delete items customers have responded to
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
  //api to delete stock orders currently in process
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
  //api to delete completed orders
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

// router.delete("/deletecompleteall", rejectUnauthenticated, (req, res) => {
  //api to delete all completed orders, currently not being used
//   pool
//     .query('DELETE FROM "complete"')
//     .then((result) => {
//       res.sendStatus(204); //No Content
//     })
//     .catch((error) => {
//       console.log("Error DELETE ", error);
//       res.sendStatus(500);
//     });
// });

router.put("/customassign", rejectUnauthenticated, (req, res) => {
  //api to assign custom orders to decovibe workers
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
//api to assign stock orders to decovibe workers
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

router.put("/cannededit", rejectUnauthenticated, (req, res) => {
  //Edits canned responses
  const { comments, canned } = req.body;
  // setting query text to update the username
  const queryText = 'UPDATE "replies" SET reply=$1 WHERE reply=$2';

  pool
    .query(queryText, [comments, canned])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.delete("/canneddelete/:canned", rejectUnauthenticated, (req, res) => {
  // setting query text to update the username
  let canned = req.params.canned
  console.log (req.params.canned)
  if (canned.slice(canned.length - 1) === "1") {
    canned = canned.slice(0, canned.length - 1)
    canned = canned + "?"
    console.log(canned);
  }
  const queryText = 'DELETE FROM "replies" WHERE reply=$1';

  pool
    .query(queryText, [canned])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.put("/priority", rejectUnauthenticated, (req, res) => {
  //api to set priority of new stock items
  const { priority, id } = req.body;
  // setting query text to update the username
  const queryText = 'UPDATE "item" SET priority=$1 WHERE id=$2';

  pool
    .query(queryText, [priority, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.put("/priorityprogress", rejectUnauthenticated, (req, res) => {
  //api to set priority of stock items in progress
  const { priority, id } = req.body;
  const queryText = 'UPDATE "progress" SET priority=$1 WHERE id=$2';

  pool
    .query(queryText, [priority, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.put("/prioritycustom", rejectUnauthenticated, (req, res) => {
  //api to set priority level of new custom items
  const { priority, id } = req.body;
  const queryText = 'UPDATE "customitem" SET priority=$1 WHERE id=$2';

  pool
    .query(queryText, [priority, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.put("/priorityrespond", rejectUnauthenticated, (req, res) => {
  //api to set priority of custom items customers have responded to
  const { priority, id } = req.body;
  const queryText = 'UPDATE "customerrespond" SET priority=$1 WHERE id=$2';

  pool
    .query(queryText, [priority, id])
    .then((result) => {
      res.sendStatus(204); //No Content
    })
    .catch((error) => {
      console.log("Error UPDATE ", error);
      res.sendStatus(500);
    });
});

router.get("/itemlist", rejectUnauthenticated, (req, res) => {
//gets all of the new stock orders
  const queryText = `SELECT * FROM "item" ORDER BY id DESC;`;
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
  //gets names of customers in history list to populate on drop down menu on history page
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
  //gets history of the customer that is selected
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
  //gets all of the custom items
  const queryText = `SELECT * FROM "customitem" ORDER BY id DESC;`;
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
//gets a total number of new stock items
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
  //gets a total number of new custom items
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
//gets all of the stock items currently in process
  const queryText = `SELECT * FROM "progress" ORDER BY id DESC;`;
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
//gets total count of all stock items in process
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
  //gets all of the custom items that were sent to the customer
  const queryText = `SELECT * FROM "customerconfirm" ORDER BY id DESC;`;
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
  //gets a total count of all odf the items sent to the customer
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
  const queryText = `SELECT * FROM "customerrespond" ORDER BY id DESC;`;
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

  const queryText = `SELECT * FROM "complete" ORDER BY id DESC;`;
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

router.get("/replies", rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "replies" ORDER BY id DESC;`;
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