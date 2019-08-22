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

router.get('/:id', (req, res) => {
    const { id } = req.params
    db('accounts').where('id', id)
    .then(acct => {
        if (acct) {
            res.status(200).json(acct)
        } else {
            res.status(404).json({
                message: 'invalid ID'
            })
        }     
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error retrieving the account'
        })
    })
});


module.exports = router;