const dbConfig = require('./dbConfig');

dbConfig.query("CREATE DATABASE IF NOT EXISTS quizProject");
dbConfig.query("USE quizProject");

dbConfig.query(`CREATE TABLE IF NOT EXISTS users (
    userId INT(11) AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    name VARCHAR(50),
    authToken VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    PRIMARY KEY (userId))`
);

dbConfig.query(`CREATE TABLE IF NOT EXISTS quiz (
    quizId INT(11) AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(1024),
    numberOfQuestions INT,
    postedBy INT,
    PRIMARY KEY (quizId),
    FOREIGN KEY (postedBy) REFERENCES users (userId))`
);

dbConfig.query(`CREATE TABLE IF NOT EXISTS questions (
    questionId INT(11) AUTO_INCREMENT,
    question VARCHAR(255),
    option1 VARCHAR(255),
    option2 VARCHAR(255),
    option3 VARCHAR(255),
    option4 VARCHAR(255),
    answer INT,
    quizId INT(11),
    PRIMARY KEY (questionId),
    FOREIGN KEY (quizId) REFERENCES quiz (quizId))`
);

dbConfig.query(`CREATE TABLE IF NOT EXISTS leaderboard (
    leaderboardId INT(11) AUTO_INCREMENT,
    quizId INT(11),
    userId INT(11),
    score INT,
    PRIMARY KEY (leaderboardId),
    FOREIGN KEY (quizId) REFERENCES quiz (quizId),
    FOREIGN KEY (userId) REFERENCES users (userId))`
);


module.exports = dbConfig;