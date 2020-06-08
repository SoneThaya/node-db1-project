const express = require('express')

const knex = require('../data/dbConfig')

const router = express.Router();

router.get('/', (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .then(accounts => {
      res.status(200).json({data:accounts})
    })
    .catch(err => {
      console.log("GET / error", err)

      res.status(500).json({message: err.message})
    })
})

router.get('/:id', (req, res) => {
  knex
    .select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json({data:account})
    })
    .catch(err => {
      console.log("GET / error", err)

      res.status(500).json({message: err.message})
    })
})



module.exports = router;