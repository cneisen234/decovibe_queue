const express = require('express');
const encryptLib = require("../modules/encryption");
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const moment = require("moment");


//GET to get all students found within the student table and ordered by their lcf_id
//We order by id because otherwise, they may flip around on the table if you try to reorder them
router.get('/studentlist', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM student ORDER BY lcf_id;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on student query ${error}`);
            res.sendStatus(500);
        });
});

//GET a singular student based off the passed in lcf_id
//Mainly used for TESTING
router.get('/student/:id', rejectUnauthenticated, (req, res) => {
    console.log('We are about to get student with certain id');

    const queryText = `SELECT * FROM student WHERE lcf_id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows).status(200);
        }).catch((error) => {
            console.log(`Error on student query ${error}`);
            res.sendStatus(500);
        });
});

//GETs all entries from entry table and joins on student table by lcf_id
router.get('/studententries', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "entry" JOIN "student" ON "student"."lcf_id" = "entry"."lcf_id";`;
    pool.query(queryText)
        .then((result) => {
            console.log('Here is the student entry list', result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log(`Error on student entry query ${error}`);
            res.sendStatus(500);
        });
});


//PUT or update on student's information
//this is used when the admin needs to change a student's information in the student table
router.put(`/updatestudent/:lcf_id`, rejectUnauthenticated, (req, res) => {
      // pull out the incoming object data
      const first_name = req.body.first_name;
      const last_name = req.body.last_name;
      const school_id = req.body.school_id || 0;
      const grade = Number(req.body.grade);
      const grad_year = req.body.grad_year;
      const school_attend = req.body.school_attend;
      const lcf_id = req.body.lcf_id;
      const lcf_start_date = req.body.lcf_start_date;
      const student_email = req.body.student_email;
      //const password = encryptLib.encryptPassword(req.body.password);
      const pif_amount = Number(req.body.pif_amount).toFixed(2);
      //const created_at = req.body.created_at;
      const role = "student";
      admin_id = null;
      //initialize the id you will get from the student
      let student_id = "";

//double insert is needed since some of the information is found within the user AND student table
      const queryText = `UPDATE "student" SET lcf_id=$1, first_name =$2, last_name=$3, school_attend=$4, school_id=$5, student_email=$6, grade=$7, grad_year=$8, lcf_start_date=$9, role=$10, pif_amount=$11  
                WHERE lcf_id =$1 RETURNING id`;
      pool
        .query(queryText, [
          lcf_id,
          first_name,
          last_name,
          school_attend,
          school_id,
          student_email,
          grade,
          grad_year,
          lcf_start_date,
          role,
          pif_amount,
        ])
        .then((result) => {
          //now lets add student information to the user table
          const query2Text = `UPDATE "user" SET lcf_id=$1, admin_id=$2, email=$3, role=$4 WHERE lcf_id =$1`;
          pool
            .query(query2Text, [
              lcf_id,
              admin_id,
              student_email,
              role,
            ])
            .then(() => res.sendStatus(201))
            .catch(function (error) {
              console.log("Sorry, there was an error with your query (student update): ", error);
              res.sendStatus(500); // HTTP SERVER ERROR
            });
        })
        .catch(function (error) {
          console.log("Sorry, there is an error with the student update", error);
          res.sendStatus(500);
        });
});
// end PUT /api/student/lcf_id

//PUT or update a student's entry
//this is done by an admin BEFORE payroll is ran fully
router.put(`/updateentry/:lcf_id`, rejectUnauthenticated, (req, res) => {
      // HTTP REQUEST BODY
      const entry = req.body; // pull the object out out of the HTTP REQUEST
      const {
        pass_class,
        gpa,
        lcf_id,
        absent,
        tardy,
        late,
        truant,
        clean_attend,
        detent_hours,
        after_school,
        act_or_job,
        passed_ua,
        current_service_hours,
        hw_rm_attended,
        comments,
        
      } = entry;
      if (entry === undefined) { //make sure bad data does not get through
          // stop, dont touch the database
          res.sendStatus(400); // 400 BAD REQUEST
          return;
      }
      
      const queryText = `
          UPDATE "entry" SET pass_class=$2, gpa=$3, clean_attend=$4, detent_hours=$5, act_or_job=$6, passed_ua=$7, current_service_hours=$8, hw_rm_attended=$9, comments=$10 
          WHERE lcf_id = $1;`; 
  
      pool
        .query(queryText, [
          lcf_id,
          pass_class,
          gpa,
          clean_attend,
          detent_hours,
          act_or_job,
          passed_ua,
          current_service_hours,
          hw_rm_attended,
          comments,
        ])
        .then(function (result) {
          // result.rows: 'INSERT 0 1';
          // it worked!
          console.log('updating an entry worked!')
          //res.sendStatus(201); //created
          res.status(201).send(result.rows);
        })
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });
  }); // end PUT

  router.post(`/adminmakeentry`, (req, res) => {
      // HTTP REQUEST BODY
    const entry = req.body; // pull the object out out of the HTTP REQUEST
    const {
      pass_class,
      gpa,
      lcf_id,
      absent,
      tardy,
      late,
      truant,
      clean_attend,
      detent_hours,
      after_school,
      act_or_job,
      passed_ua,
      current_service_hours,
      hw_rm_attended,
      comments,
    } = entry;
    if (entry === undefined) {
      // stop, dont touch the database
      res.sendStatus(400); // 400 BAD REQUEST
      return;
    }
    let date = moment.utc();
    let previous_pay_day = moment.utc("2020-08-10T00:00:00.000-05");
    let pay_day = moment.utc(previous_pay_day).add(2, "week");

    function getDate() {
      if (date >= pay_day) {
        previous_pay_day = pay_day;
        pay_day = moment(previous_pay_day).add(2, "week");
        getDate();
      }
    }
    getDate();

      
      const queryText = `
              INSERT INTO "entry" (lcf_id, pass_class, pay_day, previous_pay_day, date_submitted, gpa, clean_attend, detent_hours, act_or_job, passed_ua, current_service_hours, hw_rm_attended, comments) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);`; 
  
      pool
        .query(queryText, [
          lcf_id,
          pass_class,
          pay_day,
          previous_pay_day,
          date,
          gpa,
          clean_attend,
          detent_hours,
          act_or_job,
          passed_ua,
          current_service_hours,
          hw_rm_attended,
          comments,
        ])
        .then(function (result) {
          // result.rows: 'INSERT 0 1';
          // it worked!
          console.log("updating an entry worked!");
          //res.sendStatus(201); //created
          res.status(201).send(result.rows);
        })
        .catch(function (error) {
          console.log("Sorry, there was an error with your query: ", error);
          res.sendStatus(500); // HTTP SERVER ERROR
        });
  }); // end POST
  
  

//PUT or update a student's password
//this is used by an admin when they go to manually reset a student's password
router.put(`/updatepassword/:lcf_id`, rejectUnauthenticated, (req, res) => {

      // pull out the incoming object data
       const password = encryptLib.encryptPassword(req.body.password);
       const lcf_id = req.body.lcf_id;
      //initialize the id you will get from the student
      let student_id = "";

      const queryText = `UPDATE "student" SET password=$1 WHERE lcf_id =${lcf_id}`;
      pool
        .query(queryText, [
          password,
        ])
        .then((result) => {
          //now lets add student information to the user table
          const query2Text = `UPDATE "user" SET password=$1 WHERE lcf_id =${lcf_id}`;
          pool
            .query(query2Text, [
              password,
            ])
            .then(() => res.sendStatus(201))
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
// end PUT /api/student/lcf_id


// this route handles the deactivating of a student
//If an admin wishes to set a student as inactive, this will change the status in their 'inactive' column
//An admin can see on their homepage if a student is inactive or not (based on button shown to them)
//When a student is inactive, they can still log in but no longer make new entries
router.put("/deactivate", rejectUnauthenticated, (req, res) => {
 // grabs id and places it in path
 const lcf_id = req.body.lcf_id;
  let queryText = `UPDATE student SET inactive = 'yes' WHERE  lcf_id = $1`;
  pool
    .query(queryText, [lcf_id])

    .then(function (result) {
      console.log("Update entry item for id of", lcf_id);
      // it worked!
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});//end PUT

//this route handles the activating of a student
//like stated above, an admin can toggle a student from 'active' to 'inactive' and vice versa
router.put("/activate", rejectUnauthenticated, (req, res) => {
  // grabs id and places it in path
  const lcf_id = req.body.lcf_id;
  let queryText = `UPDATE student SET inactive = 'no' WHERE  lcf_id = $1`;
  pool
    .query(queryText, [lcf_id])

    .then(function (result) {
      console.log("Update entry item for id of", lcf_id);
      // it worked!
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log("Sorry, there was an error with your query: ", error);
      res.sendStatus(500); // HTTP SERVER ERROR
    });
});//end PUT
// // end PUT /api/student/lcf_id


///////////////////// Grabs value from the history table based on lcf_id ////////////////////////////////////
//this is mainly used for when checking history table to see if that specific student already made an entry for the pay period
router.get('/history/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id
  console.log('Grabbing all records from history');
  const queryText =
    "select * from history WHERE history.lcf_id = 1 ORDER BY date_submitted DESC";
  pool.query(queryText, [id])
  .then((result) => {
      res.send(result.rows).status(200);
  }).catch((error)=> {
      console.log('Problem grabbing the history', error)
      res.sendStatus(500);
  });
});

module.exports = router;