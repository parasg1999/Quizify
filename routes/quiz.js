const express = require('express');
const router = express.Router();

const con = require('../config/dbSetup');
const isUserLoggedIn = require('../config/checkAuth');

router.get('/add', (req, res) => {
    res.render('addQuiz');
});

router.post('/add', (req, res) => {
    console.log(req.body);
    return res.send("HELE");
    req.user = {userId: 1};
    var insertQuiz = `INSERT INTO quiz(name, description, numberOfQuestions, postedBy) VALUES
        ("${req.body.name}", "${req.body.description}", ${req.body.number}, ${req.user.userId})`;

    con.query(insertQuiz, (err, insertedQuiz) => {
        if(err) throw err;

        var quizId = insertedQuiz.insertId;
        var questionValues = ``;
        
        req.body.questions.forEach((question, index) => {
            if(index !== 0) {
                questionValues += `,`;
            }
            questionValues += `("${question.question}", "${question.option1}", "${question.option2}", "${question.option3}", "${question.option4}", ${question.answer}, ${quizId})`;
        });
        
        var insertQuestions = `INSERT INTO questions(question, option1, option2, option3, option4, answer, quizId) VALUES ${questionValues}`;
        
        con.query(insertQuestions, (err, insertedQuestions) => {
            if(err) throw err;
            
            console.log(insertedQuestions);
            res.send('OK');
        });
    });
});

// get /quiz/:id
router.get('/:id', (req, res) => {
    var getQuestions = `SELECT * FROM questions NATURAL JOIN quiz WHERE quizId = ${req.params.id}`;
    con.query(getQuestions, (err, result) => {
        if(err) throw err;

        res.render('giveQuiz', {questions: result});
    });
});

router.get('/', (req, res) => {
    con.query(`SELECT * FROM quiz`, (err, result) => {
        if(err) throw err;

        return res.render('home', {quizes: result});
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
        console.log(score);
        // res.render('quizSummary', {result, submittedQuestion: req.body.questionId, submittedAnswer: req.body.answer});
    });
});

module.exports = router;