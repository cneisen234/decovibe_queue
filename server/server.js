
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

const corsOptions = {
  origin: 'https://www.heattransferwarehouse.com',
  methods: ['GET', 'POST'],
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));


// Route includes
const userRouter = require('./routes/userrouter');
const itemRouter = require('./routes/itemrouter');


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

app.get("/healthcheck", (req, res) => {
res.sendStatus(200)
});


// Serve static files
app.use(express.static('build'));

 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
   console.log("server running on: ", PORT);
 });