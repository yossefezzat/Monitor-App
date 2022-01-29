const express = require('express')
const helmet = require('helmet')
const expressLimit = require('express-rate-limit')
const userRoutes = require('./routes/userRoutes')
const checkRoutes = require('./routes/checkRoutes')
const reportRoutes = require('./routes/reportRoutes')
const {
  run
} = require('./polling/process')

const app = express()

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

// Using helmet to increase security
app.use(helmet());

// // Using Limiter to prevent attacks
// const apiLimiter = expressLimit.rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min is the time of our cycle
//   max: 100, // Max number of requests
//   delayMs: 0, // Disable delay between each request
//   // Each ip will be able to make only 100 request in each 15 min with no delay between requests
// });
// app.use(apiLimiter); // apply to all requests

// Simple main api url response
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome, this is our great restful api to monitor other websites.'
  });
});

app.use(userRoutes);
app.use(checkRoutes);
app.use(reportRoutes);

app.listen(3000, () => {
  console.log('server up in port 3000')
});

// running polling process
run();
