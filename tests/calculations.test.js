const axios = require("axios");

// override default axios adapter so that it ignores cors for server-side requests
axios.defaults.adapter = require("axios/lib/adapters/http");

//Many of the tests repeat the same structure as they test very similar things
//What is mainly looked at is the status code received, as well as:
// If a PUT, that the chnaged thing comes back from the database changed
//If a GET, that certain data is actually received back

//Many of the calculations relied on expecting a certain value back from the student total and student savings amount

//**************Admins**************** */ Room for more tests if wanted (having to do with admin creation, deletion, etc.)
//----------POST a new admin-----------

//---------GET an admin-----------------

//---------PUT an admin----------------

//--------DELETE an admin--------------

//***************students**************** */
//-------POST a new student (create)----------------------
let student = null;
const SERVER_URL = "http://localhost:5000";
test("Create a new student via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 7,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //check to see the type of response back
  expect(typeof student.lcf_id).toBe(typeof 0); //want id to be a typeof number
  expect(student.lcf_id > 0); //if id received back is less then 0, we have problems
  console.log(`Student created  ${student.lcf_id}`);
  console.log("hi", response.data);
});

// //--------GET a student (fetch)------------------
test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200); //check status code
  
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

// //---------PUT a student (update)--------------
test(`Update the student via HTTP PUT`, async () => {
  const newName = "Newer";
  //I will likely have to type out all of sudent here agian since not getting all data back...
  student = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 7,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const newStudent = { ...student, first_name: newName };
  //const response = await axios.put(`${SERVER_URL}/api/student/${student.lcf_id}`, newStudent);
  const response = await axios.put(
    `${SERVER_URL}/api/student/updatestudent/${student.lcf_id}`,
    newStudent
  );
  expect(response.status).toBe(201); //since using POST at the moment

  //config reminds you of what you send
  //student = JSON.parse(response.config.data);
  //expect(student.first_name).toBe(newName);

  console.log(
    `Student with LCFid ${student.lcf_id} name changed to ${newName}`
  );
  console.log("check response", student);
});
// //One work around: simply do a post and instead of checking post, use a get
// //to try and check if it appears in the database
// //Since dealing with double inserts, I can't always get back
// //what I want all the time



// //**************Entries**************************** */
// //------POST an entry (create)---------------------
test("Create a new entry via HTTP POST", async () => {
  
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.3,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "Testing",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  entry = response.data;
  expect(response.status).toBe(201);
  //expect(typeof(response.data)).toBe(typeof({}));
  //expect(typeof(response.data.id)).toBe(typeof(0));

  console.log(
    `Entry created with and student ${student.first_name}`
  );
  console.log("Entry which is reponse.data is", entry);
});

// //--------------GET an entry-------------------
test(`Get an entry via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${entry[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].id).toBe(entry[0].id);

  console.log(`response.data is`, response.data);
});

// //----------------DELETE an entry------------------------ //should we just soft delete?
test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${entry[0].id}`);
  expect(response.status).toBe(204);
});

// /*************************************************** */
// //-----------FAILED cases (i.e. student does not get check)-------------------

// //student is failing at least one class
// //WILL THESE BE ON DIFFERENT RESPONSES?
// //Either... post data where example student fails it and check other route?
// //Or just have entry already created and then check calulations?
// //Will have to see how backend works... what is coming from where
test("Create a new entry via HTTP POST where student is failing a class", async () => {
  //figure out if going by id or by lcf_id
  const newEntry = {
    lcf_id: 100,
    pass_class: "No",
    gpa: 2.3,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "Pass class? NOPE",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].pass_class).toBe('No');
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].pass_class).toBe('No');
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});
///////////////////////////////////////////////////////////////////////////
// //student's GPA is less than 2.0 (need to check rounding?) 
test("Create a new entry via HTTP POST where student GPA is below 2.0", async () => {
    const newEntry = {
      lcf_id: 100,
      pass_class: "Yes",
      gpa: 1.9,
      clean_attend: 9,
      detent_hours: "No",
      act_or_job: "Yes",
      passed_ua: "Yes",
      current_service_hours: 2,
      hw_rm_attended: "Yes",
      comments: "GPA high enough? NOPE",
    };
    let response;
    try {
      response = await axios.post(`${SERVER_URL}/entry`, newEntry);
    } catch (err) {
      console.log(err.response.data);
    }
    fail = response.data;
    expect(response.status).toBe(201);
  });
  
  test(`Get the entry that was just posted via HTTP GET`, async () => {
    const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
    expect(response.status).toBe(200);
    expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
    expect(response.data[0].gpa).toBe("1.90");
  // expect(response.data.check_this_payday).toBe('no');
  // expect(reponse.data.money_to_student).toBe(0);
  });
  
  test(`Run CALC to get calculations`, async () => {
    const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
    expect(response.status).toBe(200);
  });
  
  test(`get calculations from pending`, async () => {
    const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
    expect(response.status).toBe(200);
    // expect(response.data[0].id).toBe(fail[0].id);
     expect(response.data[0].gpa).toBe("1.90");
  // expect(response.data.check_this_payday).toBe('no');
   expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
  //console.log('this would be open transation table', response.data)
  });
  
  test("Delete the entry via HTTP DELETE", async () => {
    const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
    expect(response.status).toBe(204);
  });
  
  test("Delete the open transaction via HTTP DELETE", async () => {
    const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
    expect(response.status).toBe(204);
  });

  ///////////////////////////////////////////////////////////////////////////
//student has detention hours
test("Create a new entry via HTTP POST where student has detention hours", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.8,
    clean_attend: 9,
    detent_hours: "Yes",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "You have detention hours? YES",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].detent_hours).toBe("Yes");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].detent_hours).toBe("Yes");
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});

///////////////////////////////////////////////////////////////////////////
//student is not involved in school activities and no job
test("Create a new entry via HTTP POST where student has no outside activities", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.8,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "No",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "Job or after school activity? NOPE",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].act_or_job).toBe("No");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].act_or_job).toBe("No");
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});

///////////////////////////////////////////////////////////////////////////
//student is not living a drug free life
test("Create a new entry via HTTP POST where student is not drug free", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.8,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "No",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "You have detention hours? YES",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].passed_ua).toBe("No");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].passed_ua).toBe("No");
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});

///////////////////////////////////////////////////////////////////////////
//student has less than 2 service hours for that pay period
test("Create a new entry via HTTP POST where student has not enough service hours", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.8,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 1,
    hw_rm_attended: "Yes",
    comments: "Enough service hours? NOPE",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].current_service_hours).toBe(1);
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].current_service_hours).toBe(1);
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});

///////////////////////////////////////////////////////////////////////////
//student did not attend manadatory homeroom
test("Create a new entry via HTTP POST where student did not attend homeroom", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.8,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "No",
    comments: "homeroom attended? NOPE",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  fail = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${fail[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(fail[0].lcf_id);
  expect(response.data[0].hw_rm_attended).toBe('No');
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
  // expect(response.data[0].id).toBe(fail[0].id);
   expect(response.data[0].hw_rm_attended).toBe('No');
// expect(response.data.check_this_payday).toBe('no');
 expect(response.data[0].money_to_student).toBe("0.00"); //should this be coming in as a number or string?
//console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${fail[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${fail[0].id}`);
  expect(response.status).toBe(204);
});


////////////////////////////////////////////////////////
//student is deemed inactive

//--------------GPA bonus cases---------------------------------
//NEED TO HANDLE ROUNDING TOO (rounding should be done in SQL land?)
//if 2.0
test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "GPA of 2.0",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  expect(response.data[0].gpa).toBe("2.00");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("22.50"); //should this be coming in as a number or string?
  //-------------Check how much is given to savings------------------------
  expect(response.data[0].amt_to_savings).toBe("22.50")
console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

//if 2.5
test("Create a new entry via HTTP POST where student has gpa of 2.5", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.5,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "GPA of 2.5",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  expect(response.data[0].gpa).toBe("2.50");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("32.50"); //should this be coming in as a number or string?
  //-------------Check how much is given to savings------------------------
  expect(response.data[0].amt_to_savings).toBe("32.50")
console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

//if 3.0
test("Create a new entry via HTTP POST where student has gpa of 3.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 3.0,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "GPA of 3.0",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  expect(response.data[0].gpa).toBe("3.00");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("42.50"); //should this be coming in as a number or string?
  //-------------Check how much is given to savings------------------------
  expect(response.data[0].amt_to_savings).toBe("42.50")
console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

//if 3.5
test("Create a new entry via HTTP POST where student has gpa of 3.5", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 3.5,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "GPA of 3.5",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  expect(response.data[0].gpa).toBe("3.50");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("52.50"); //should this be coming in as a number or string?
  //-------------Check how much is given to savings------------------------
  expect(response.data[0].amt_to_savings).toBe("52.50")
console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

//if 4.0
test("Create a new entry via HTTP POST where student has gpa of 4.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 4.0,
    clean_attend: 9,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "GPA of 4.0",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  expect(response.data[0].gpa).toBe("4.00");
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("62.50"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("62.50")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});


//-------------MIDDLE SCHOOLER (base pay of $5)-------------------------------

//if 6th grade 666666666666666666666666666666666666666666666
test("Create a new 6th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 6,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "6th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("25.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("25.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});

//666666666666666666666666666666666666666666666

//if 7th grade 77777777777777777777777777777
test("Create a new 7th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 7,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "7th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("25.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("25.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});

//77777777777777777777777777777777777777777777777

//if 8th grade 88888888888888888888888888888888
test("Create a new 6th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 8,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "8th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("25.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("25.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});

//8888888888888888888888888888888888

//--------------HIGH SCHOOLER (base pay of $10)----------------------------

//if 9th grade 9999999999999999999999999999999999
test("Create a new 9th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 9,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "9th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("50.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("50.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});

//999999999999999999999999999999999

//if 10th grade 101010101010
test("Create a new 10th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 10,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "10th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("50.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("50.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});
//10101010101010


//if 11th grade 111111111111111111111111
test("Create a new 11th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 11,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "11th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("50.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("50.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});
//11111111111111111111111111111111

//if 12th grade 12121212121212
test("Create a new 12th grader via HTTP POST", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 12,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 0.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "12th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("50.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("50.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});
//121212121212121212

///-------ROOM FOR OTHER TESTS-----------------------
//-------------Make sure charges are appropriately calculated-----------

//-----------Check case where student is overcharged (charge balance must remain)-----
// A student can never have a negative paycheck nor should have their savings charged

//----------Check Pay It Forward is ran correctly--------------
//This means making sure PIF takes out of amount going to student, not savings or anything like that

test("Create a new student via HTTP POST with a PIF amount", async () => {
  const newStudent = {
    lcf_id: 100,
    first_name: "New",
    last_name: "Student",
    grade: 12,
    school_attend: "Horizon",
    student_email: "test@example",
    password: "test",
    lcf_start_date: "01/01/2020",
    pif_amount: 6.00,
    grad_year: "2021",
  };
  const response = await axios.post(
    `${SERVER_URL}/api/user/addstudent`,
    newStudent
  );
  student = response.data[0];
  expect(response.status).toBe(201);
  expect(typeof response.data).toBe(typeof []); //I think response right now is set to just get id back?
  expect(typeof student.lcf_id).toBe(typeof 0);
  expect(student.lcf_id > 0);
});

test(`Get the student via HTTP GET`, async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/student/student/${student.lcf_id}`
  );
  expect(response.status).toBe(200);
  // expect(response.data.id).toBe(student.id);
  // expect(typeof(response.data)).toBe(typeof({}));
  console.log(`student with id ${student.lcf_id} successfully retrieved.`);
});

test("Create a new entry via HTTP POST where student has gpa of 2.0", async () => {
  const newEntry = {
    lcf_id: 100,
    pass_class: "Yes",
    gpa: 2.0,
    clean_attend: 10,
    detent_hours: "No",
    act_or_job: "Yes",
    passed_ua: "Yes",
    current_service_hours: 2,
    hw_rm_attended: "Yes",
    comments: "12th grader",
  };
  let response;
  try {
    response = await axios.post(`${SERVER_URL}/entry`, newEntry);
  } catch (err) {
    console.log(err.response.data);
  }
  success = response.data;
  expect(response.status).toBe(201);
});

test(`Get the entry that was just posted via HTTP GET`, async () => {
  const response = await axios.get(`${SERVER_URL}/entry/${success[0].lcf_id}`);
  expect(response.status).toBe(200);
  expect(response.data[0].lcf_id).toBe(success[0].lcf_id);
  
// expect(response.data.check_this_payday).toBe('no');
// expect(reponse.data.money_to_student).toBe(0);
});

test(`Run CALC to get calculations`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/calc`);
  expect(response.status).toBe(200);
});

test(`get calculations from pending`, async () => {
  const response = await axios.get(`${SERVER_URL}/api/admin/pending`);
  expect(response.status).toBe(200);
 
 expect(response.data[0].money_to_student).toBe("44.00"); //should this be coming in as a number or string?

 //-------------Check how much is given to savings------------------------
 expect(response.data[0].amt_to_savings).toBe("50.00")

console.log('this would be open transation table', response.data)
});

test("Delete the entry via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/entry/${success[0].id}`);
  expect(response.status).toBe(204);
});

test("Delete the open transaction via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/admin/${success[0].id}`);
  expect(response.status).toBe(204);
});

// //--------DELETE a student (delete)----------- Need to actually delete so as not to cause issues rerunning tests
test("Delete the student via HTTP DELETE", async () => {
  const response = await axios.delete(`${SERVER_URL}/api/user/${student.lcf_id}`);
  expect(response.status).toBe(204);
});






