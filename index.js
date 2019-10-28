// implement your API here
const express = require("express");
// const cors = require('cors')
// bring in the model so we can talk to the db
const db = require("./data/db");

const app = express();

// app.use(cors())
app.use(express.json());

app.get("/api/users/", getAllUsers);
app.post("/api/users/", createNewUser);
app.get("/api/users/:id", getSingleUser);
app.delete("/api/users/:id", deleteUser);
app.get("*", handleDefaultRequest);

function createNewUser(req, res) {
  if (req.body.name && req.body.bio) {
        db.insert(req.body)
          .then(x => {
            db.find()
              .then(data =>
                res
                  .status(200)
                  .json({ message: "Created new user", data: data })
              )
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      }
    else {
        res
        .status(400)
        .json({
          errorMessage: "Please provide name and bio for the new user."
        });
    }
}

function getSingleUser(req, res) {
  db.findById(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.log(err));
}

function getAllUsers(req, res) {
  db.find()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => conosle.log(err));
}

function deleteUser ( req, res ) {
   const { id } = req.params;
   db.findById(id)
   .then(deletedUser => {
    db.remove(id)
    .then(x => {
        res.status(201).json({message: 'Deleted User', data: deletedUser})
    })
    .catch(err => console.log(err))
   })
}

function handleDefaultRequest(req, res) {
  res.json("Read docs properly, dude");
}

app.listen(process.env.PORT || 3001, () => {
  console.log("listening on " + (process.env.PORT || 3001));
});