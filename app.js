const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    routerIndex = require('./routes/index')
require('dotenv').config()

mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`, { useNewUrlParser: true })

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routerIndex)

app.listen(port, function () {
    console.log('Listening on port:', port)
})