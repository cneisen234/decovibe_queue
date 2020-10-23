const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

//This route deals with much of the functions found in database_functions.sql
//That is, running the calculations from the student entries and confirming them if all looks good
//Reminder that confirming entries means they get pushed to the History table and no longer editable

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
///////////////////////// Calls function to run the calculations for entries //////////////////////////
//This takes entries in the entries table and runs the logic to see how much each student should receive
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

///////////////////// Grabs everything from the history table ////////////////////////////////////
router.get('/history', rejectUnauthenticated, (req, res) => {
    console.log('Grabbing all records from history');
    const queryText =
      'select history.lcf_id, first_name, last_name, pay_day, date_submitted, pass_class, gpa, clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours, hw_rm_attended, attend_payment, pif_donations, bonus_amount, bonus_comments, gpa_bonus, amt_to_savings, money_to_student, student_debt, student_debt_payment, student_debt_remaining, total, "comments", did_we_pay from "history" left join "charge_student" on history.lcf_id=charge_student.lcf_id'; //this is useful for the admin to view all past entries via the 'past reports' tab
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows).status(200);
    }).catch((error)=> {
        console.log('Problem grabbing the history', error)
        res.sendStatus(500);
    });
});


////////////////////// Grabs everything from the charge_student table ///////////////////////////////
//this allows the admin to view all past charges via the 'Past Deductions' tab
router.get ('/chargehistory', rejectUnauthenticated, (req, res) => {
    console.log('grabbing all deduction history');
    const queryText = `SELECT charge_student.lcf_id, charge_student.date, type, description, amount, first_name, last_name FROM charge_student
    Join student on student.lcf_id = charge_student.lcf_id`
    pool.query(queryText)
    .then((result) => {
        res.send(result.rows).status(200);
    }).catch((error) => {
        console.log('Problem grabbing the deductions', error)
        res.sendStatus(500);
    })
})

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