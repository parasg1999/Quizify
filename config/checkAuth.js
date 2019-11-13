const con = require('./dbSetup');

const isUserLoggedIn = (req, res, next) => {
    const searchUser = `SELECT * FROM users WHERE authToken = "${req.cookies.userId}"`;
    con.query(searchUser, (err, result) => {
        if(err) throw err;
        if(result.length === 0) {
            return res.redirect('/auth/login');
        }
        req.user = result[0];
        next();
    });
}

module.exports = isUserLoggedIn;