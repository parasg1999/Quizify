const express = require('express');
const router = express.Router();

const con = require('../config/dbSetup');
const {isPasswordCorrect, hashPassword, generateAuthToken} = require('../config/bcryptConfig');
const isUserLoggedIn = require('../config/checkAuth');

router.get('/', (req, res) => {
    res.redirect('/quiz');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

module.exports = router;