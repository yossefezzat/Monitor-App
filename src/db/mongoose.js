const mongoose = require('mongoose')
const config = require('config')

const database = config.get('database.url')

// useNewUrlParser = true , useCreateIndex = true (mongoose v6)
mongoose.connect(database)
