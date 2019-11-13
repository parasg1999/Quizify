const bcrypt = require('bcrypt');

const hashPassword = plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
}

const generateAuthToken = username => {
    return bcrypt.hashSync(username, 10);
}

const isPasswordCorrect = (plainTextPassword, hash) => {
    return bcrypt.compareSync(plainTextPassword, hash);
}

module.exports = {
    hashPassword,
    isPasswordCorrect,
    generateAuthToken
}