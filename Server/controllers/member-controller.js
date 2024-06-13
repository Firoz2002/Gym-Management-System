const crypto = require("crypto");

const db = require("../config/config");
const { setDoc, doc, getDoc, collection, query, where, getDocs, deleteDoc } = require("firebase/firestore");

const addMember = async(req, res, next) => {
    try {
        const data = {
            gymId: crypto.randomInt(0, 100000),
            role: 'member',
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            height: req.body.height,
            weight: req.body.weight,
            membership: req.body.membership,
        }

        await setDoc(doc(db, 'users', `${data.gymId}`), data)
        .then(async (docSnapshot) => {
            res.status(201).json({
                message: "Member successfully added"
            })
        })

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getMember = async(req, res, next) => {
    try {
        const gymId = req.params.id;

        const memberRef = doc(db, 'users', `${gymId}`);
        getDoc(memberRef)
            .then((docSnapshot) => {
                if(docSnapshot.exists()) {
                    res.status(200).json({
                        message: "Successfully fetched user",
                        data: docSnapshot.data()
                    })
                }
            })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const removeMember = async(req, res, next) => {
    try {
        const data = req.body;

        data.gymIds.forEach(gymId => {
            const memberRef = doc(db, 'users', `${gymId}`);
            deleteDoc(memberRef)         
        });

        res.status(201).json({
            message: "Successfully removed member"
        })  

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const updateMember = async(req, res, next) => {
    try {
        
    } catch (error) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getMembers = async(req, res, next) => {
    try {
        const memberRef = collection(db, 'users');
        const data = query(memberRef, where('role', '==', 'member'));
        const members = await getDocs(data);

        const arr = [];

        members.forEach((member) => {
            arr.push(member.data());
        });
        res.send(arr);

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
} 

module.exports = {
    addMember,
    getMember,
    updateMember,
    removeMember,
    getMembers
}