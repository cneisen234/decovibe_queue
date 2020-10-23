
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const studentRouter = require('./routes/student.router');
const adminRouter = require('./routes/admin.router');

const entryRouter = require('./routes/entry.router');
const chargeRouter = require('./routes/charge.router');


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
app.use('/api/student', studentRouter);
app.use('/api/admin', adminRouter);
app.use('/entry', entryRouter);
app.use('/charge', chargeRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
