const express = require("express");
const router = express.Router();

const knex = require("../data/dbConfig");

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to get posts from database" });
    });
});

router.get("/:id", (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where("id", "=", req.params.id)
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to get post from database" });
    });
});

router.post("/", (req, res) => {
  // remember to validate the data sent by the client
  knex
    .insert(req.body) // ignore the console warning on SQLite
    .into("accounts")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to insert post" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;

  // validate the data before calling the database

  knex("accounts")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      // count: how many records/rows were updated
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to update post" });
    });
});

router.delete("/:id", (req, res) => {
  knex("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      // count: how many records/rows were delete
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json({ error: "Failed to delte post" });
    });
});

module.exports = router;
