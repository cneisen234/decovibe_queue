
const express = require('express');
require('dotenv').config();
const moment = require('moment')

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// API requests



// let data = {
// };


// Route includes
const userRouter = require('./routes/userrouter');
const itemRouter = require('./routes/itemrouter');
const autoRouter = require("./routes/autorouter.js");


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */ 
//i.e. helps direct necessary actions/data to the correct place
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);
app.use("/api/auto", autoRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = 8080 || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
