const jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtSecret = process.env.SECRET;

const islogged = (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(token) {
            const username = jwt.verify(token, jwtSecret).username;
            const role = jwt.verify(token, jwtSecret).role;

            res.status(200).json({
                islogged: true,
                role: role,
                username: username
            })
        } else {
            res.status(401).json({
                islogged: false
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Some error Occurred"
        })
    }
}

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if(token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if(err) {
                    return res.status(401).json({ message: "Not authorized" })
                } else {
                    if(decodedToken.role !== 'admin') {
                        return res.status(401).json({ message: "Not authorized" })
                    } else {
                        next();
                    }
                }
            })
        } else {
            return res.status(401).json({
                message: "Not authorized, token not avaliable"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Some error Occurred"
        })
    }
}

module.exports = {
    islogged,
    adminAuth,
}