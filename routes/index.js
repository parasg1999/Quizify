const express = require('express');
const router = express.Router();

const con = require('../config/dbSetup');
const {isPasswordCorrect, hashPassword, generateAuthToken} = require('../config/bcryptConfig');
const isUserLoggedIn = require('../config/checkAuth');

router.get('/', (req, res) => {
    res.redirect('/quiz');
});

router.get('/profile', isUserLoggedIn, (req, res) => {
    var selectAllQuiz = `SELECT * FROM quiz WHERE postedBy=${req.user.userId}`;
    con.query(selectAllQuiz, (err, result) => {
        if(err) throw err;
        
        res.render('profile', {req, result});
    });
});

router.get('/leaderboard', (req, res) => {
    var getScore = `SELECT userId, username, name, SUM(score) AS score
        FROM 
        (SELECT userId, quizId, username, u.name AS name, MAX(score) AS score 
        FROM 
        leaderboard NATURAL JOIN users AS u GROUP BY quizId, userid) AS a 
        GROUP BY 
        userId
        ORDER BY score desc
        LIMIT 15;`;

        con.query(getScore, (err, rows) => {
            if(err) throw err;

            res.render('leaderboard', {req, rows});
        });
});

module.exports = router;