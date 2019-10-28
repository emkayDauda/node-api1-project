// implement your API here
const express = require('express')
// const cors = require('cors')
// bring in the model so we can talk to the db
const db = require('./data/db')

const app = express()

// app.use(cors())
app.use(express.json())

app.get('*', handleDefaultRequest)



function handleDefaultRequest(req, res) {
    res.json('Read docs properly, dude')
  }
  
  app.listen(process.env.PORT || 3001, () => {
    console.log('listening on ' + (process.env.PORT || 3001));
  })