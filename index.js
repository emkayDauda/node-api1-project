// implement your API here
const express = require('express')
// const cors = require('cors')
// bring in the model so we can talk to the db
const db = require('./data/db')

const app = express()

// app.use(cors())
app.use(express.json())

app.get('/api/users/', getAllUsers)
app.get('/api/users/:id', getSingleUser)
app.get('*', handleDefaultRequest)

function getSingleUser (req, res) {
    db.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err))
}

function getAllUsers (req, res) {
    db.find()
    .then(data => {
        console.log(data)
        res.status(200).json(data)
    })
    .catch(err => conosle.log(err))
}



function handleDefaultRequest(req, res) {
    res.json('Read docs properly, dude')
  }
  
  app.listen(process.env.PORT || 3001, () => {
    console.log('listening on ' + (process.env.PORT || 3001));
  })