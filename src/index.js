const express = require('express')
const helmet = require('helmet')
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
