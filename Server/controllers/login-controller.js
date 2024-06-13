const jwt = require('jsonwebtoken');
const { doc, getDoc } = require('firebase/firestore');
const db = require('../config/config');

require('dotenv').config();
const jwtSecret = process.env.SECRET;

const login = async(req, res, next) => {
    try {

        const gymId = req.params.id;

        const userRef = doc(db, 'users', `${gymId}`);
        getDoc(userRef)
            .then( async(docSnapshot) => {
                if(docSnapshot.exists()) {
                    const role = await (docSnapshot.data()).role;
                    const name = await (docSnapshot.data()).name;

                    const maxAge = 3*60*60;
                    const token = jwt.sign(
                        {id: gymId, role: role, username: name},
                        jwtSecret,
                        {
                            expiresIn: maxAge
                        }
                    );

                    res.cookie('jwt', token, {
                        httpOnly: true,
                        maxAge: maxAge * 1000,
                    });

                    res.status(201).json({
                        message: "User successfully logged in"
                    })
                    
                } else {
                    res.status(403).json({
                        message: "Login Failed"
                    })
                }
            })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Some error occurred",
            error: error
        })
    }
}

module.exports = {
    login
}