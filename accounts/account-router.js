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

router.post('/', (req, res) => {
    // INSERT INTO Accounts (all of the keys from req.body) VALUES (all of the values from req.body)
    const acctData = req.body

    db('accounts').insert(acctData)
    .then(ids => {
        res.status(201).json({ newAcctId: ids[0]})
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error creating the account'
        })
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    db('accounts').where({ id }).update(changes)
    .then(count => {
        if (count) {
            res.json({ updated: count })
        } else {
            res.status(404).json({ message: 'invalid account id'})
        }      
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error creating the account'
        }) 
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db('accounts').where({ id }).del()
    .then(count => {
        if (count) {
            res.json({ deleted: count })
        } else {
            res.status(404).json({ message: 'invalid account id'})
        }      
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error deleting the account'
        }) 
    })
});


module.exports = router;