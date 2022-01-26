const express = require('express')
const cookieParser = require("cookie-parser")
const userRoutes = require('./routes/userRoutes')
const checkRoutes = require('./routes/checkRoutes')
const reportRoutes = require('./routes/reportRoutes')

const app = express()

app.use(cookieParser())
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.use(userRoutes)
app.use(checkRoutes)
app.use(reportRoutes)

app.listen(3000, () => {
  console.log('server up in port 3000')
})
