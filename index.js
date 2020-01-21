const db = require("./data/db.js");

// implement API here
const express = require("express");

const app = express();

app.use(express.json());

// Routes

app.get("/", (req, res) => {
  res.status(200);
  res.send("Success");
});

// POST to /api/users
app.post("/api/users", (req, res) => {
  if (req.body.name && req.body.bio) {
    //
    db.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({
          errorMessage:
            "here was an error while saving the user to the database"
        });
      });
  } else {
    res
      .status(400)
      .json({ message: "Missing 'name' or 'bio' field", err: err });
  }
});

//GET to /api/users
app.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The 'users' information could not be retrieved"
      });
    });
});

// GET to /api/users/:id
app.get("/api/users/:id", (req, res) => {
  db.findById(req.body.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ errorMessage: "User not found" });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err =>
      res.status(500).json({
        errorMessage: "Couldn't get that user with id "
      })
    );
});

// DELETE to /api/user/:id
app.delete("/api/users/:id", (req, res) => {
  db.remove(req.body.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ errorMessage: "User not found" });
      } else {
        res.status(201).json({ message: "User deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Something went wrong" });
    });

  //   db.remove(req.body.id).then(user => res.status(201).json(user));
});

app.put("/api/users/:id", (req, res) => {
  let id = req.params.id;
  let userInfo = req.body;

  db.update(id, userInfo)
    .then(user => {
      if (user) {
        res.status(200).json({ success: true, user });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
