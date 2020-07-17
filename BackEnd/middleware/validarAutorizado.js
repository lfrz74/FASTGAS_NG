const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autorCab = req.get('Authorization');
    if (!autorCab) {
        const error = new Error("No autenticado.");
        error.statusCode = 401;
        throw error;
    }
    const token = autorCab.split(' ')[1];
    let tokenDecodif;
    try {
        tokenDecodif = jwt.verify(token, process.env.SECRET_JWT);
    }  catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!tokenDecodif) {
        const error = new Error("No autenticado..!");
        error.statusCode = 401;
        throw error;
    }
    req.userId = tokenDecodif.userId;
    next();
};