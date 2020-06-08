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

// not posting correctly
router.post('/', (req, res) => {
  knex('accounts')
    .insert(req.body, "id")
    .then(account => {
      res.status(201).json({data: account})
    })
    .catch(err => {
      console.log("POST / error", err)

      res.status(500).json({message: err.message})
    })
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  knex('accounts')
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(201).json({message: 'account updated successfully'})
      } else {
        res.status(404).json({message: 'no account found'})
      }
    })
    .catch(err => {
      console.log("UPDATE / error", err)

      res.status(500).json({message: err.message})
    })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  knex('accounts')
    .where({ id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({message: "account deleted successfully"})
      } else {
        res.status(404).json({message: "account not found"})
      }
    })
    .catch(err => {
      console.log("DELETE / error", err)

      res.status(500).json({message: err.message})
    })

})


module.exports = router;