const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    // SELECT * FROM Accounts;
    db('accounts')
    .then(acct => {
        res.status(200).json(acct)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error retrieving the accounts'
        })
    })
});


module.exports = router;