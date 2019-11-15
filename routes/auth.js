const express = require('express');
const router = express.Router();

const con = require('../config/dbSetup');
const {isPasswordCorrect, hashPassword, generateAuthToken} = require('../config/bcryptConfig');
const isUserLoggedIn = require('../config/checkAuth');

router.get("/register", (req, res) => {
    res.render(`register`);
});

router.get("/login", (req, res) => {
    res.render(`login`);
});

router.post("/register", (req, res) => {
    var hashedPassword = hashPassword(req.body.password);

    var insertString = `INSERT INTO users(username, password, name, email) 
    VALUES ("${req.body.username}", "${hashedPassword}", "${req.body.name}", "${req.body.email}")`;

    con.query(insertString, (err, result) => {
        if (err) throw err;
        res.redirect("/auth/login");
    });
});

router.post("/login", (req, res) => {
    var selectString = `SELECT * FROM users WHERE username = "${req.body.username}"`;

    con.query(selectString, (err, result) => {
        if (err) throw err;
        if(result.length === 0) {
            return res.redirect('/auth/login');
        }

        var verifyUser = isPasswordCorrect(req.body.password, result[0].password);
        if(!verifyUser) {
            return res.redirect('/auth/login');
        }
    
        var authToken = generateAuthToken(result[0].username);

        con.query(`UPDATE users SET authToken = "${authToken}" WHERE userId = ${result[0].userId}`)

        res.cookie("userId", authToken, {
            expire: Date.now() + 1000 * 60 * 60 * 24
        });

        res.redirect("/");
    });
});

router.get("/logout", isUserLoggedIn, (req, res) => {
    con.query(`UPDATE users SET authToken = NULL WHERE authToken = "${req.user.authToken}"`)
    res.clearCookie("userId");
    res.redirect("/auth/login");
});

module.exports = router;