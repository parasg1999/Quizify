const express = require("express");
const cookieParser = require("cookie-parser");

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const setUserObject = require('./config/loginFunction');

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("static"));
app.use(
    express.json({
        limit: "50mb"
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb",
        parameterLimit: 50000
    })
);

app.use(setUserObject);

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);

const port = 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
