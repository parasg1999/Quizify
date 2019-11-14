const express = require('express');
const router = express.Router();

const con = require('../config/dbSetup');
const isUserLoggedIn = require('../config/checkAuth');

router.get('/add', isUserLoggedIn, (req, res) => {
    res.render('addQuiz' , {req});
});

router.post('/add', isUserLoggedIn, (req, res) => {
    var insertQuiz = `INSERT INTO quiz(name, description, numberOfQuestions, postedBy) VALUES
        ("${req.body.name}", "${req.body.description}", ${req.body.number}, ${req.user.userId})`;

    con.query(insertQuiz, (err, insertedQuiz) => {
        if(err) throw err;

        var quizId = insertedQuiz.insertId;
        var questionValues = ``;

        if(typeof req.body.question === "string") {
            questionValues += `("${req.body.question}", "${req.body.option1}", "${req.body.option2}", "${req.body.option3}", "${req.body.option4}", ${req.body.correctoption}, ${quizId})`;            
        } else {
            req.body.question.forEach((question, index) => {
                if(index !== 0) {
                    questionValues += `,`;
                }
                questionValues += `("${question}", "${req.body.option1[index]}", "${req.body.option2[index]}", "${req.body.option3[index]}", "${req.body.option4[index]}", ${req.body.correctoption[index]}, ${quizId})`;
            });
        }
        
        var insertQuestions = `INSERT INTO questions(question, option1, option2, option3, option4, answer, quizId) VALUES ${questionValues}`;
        
        con.query(insertQuestions, (err, insertedQuestions) => {
            if(err) throw err;
            
            res.redirect('/');
        });
    });
});

// get /quiz/:id
router.get('/:id', isUserLoggedIn, (req, res) => {
    var getQuestions = `SELECT * FROM questions NATURAL JOIN quiz WHERE quizId = ${req.params.id}`;
    con.query(getQuestions, (err, result) => {
        if(err) throw err;

        res.render('giveQuiz', {questions: result, req});
    });
});

router.get('/', (req, res) => {
    con.query(`SELECT * FROM quiz`, (err, result) => {
        if(err) throw err;

        return res.render('home', {quizes: result, req});
    });
});

router.post('/answer/:id', isUserLoggedIn, (req, res) => {
    var allQuestions = `SELECT * FROM questions WHERE quizId = ${req.params.id}`;
    var score = 0;
    con.query(allQuestions, (err, result) => {
        if(err) throw err;

        result.forEach((question,index) => {
            if(question.questionId.toString() === req.body.questionId[index]) {
                if(question.answer.toString() === req.body.answer[index]) {
                    score++;
                }  
            }
        });

        con.query(`INSERT INTO leaderboard(quizId, userId, score) VALUES (${req.params.id}, ${req.user.userId}, ${score})`);
        res.render('score', {result, req, score});
    });
});

module.exports = router;