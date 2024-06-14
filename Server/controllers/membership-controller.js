const db = require("../config/config");
const {doc, setDoc, query, collection, getDocs, getDoc, where} = require('firebase/firestore')

const addMembershipPlan = async(req, res, next) => {
    try {
        const data = {
            name: req.body.name,
            duration: req.body.duration,
            trainer: req.body.trainer,
            vip: req.body.vip,
            diet: req.body.diet,
            fees: req.body.fees            
        }

        await setDoc(doc(db, 'memberships', `${data.name}`), data)
        .then((docSnapshot) => {
            res.status(201).json({
                message: "Membership successfully added"
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

const getMembership = async(req, res, next) => {
    try {
        const membershipRef = doc(db, 'memberships', `${req.params.membershipPlan}`);
        await getDoc(membershipRef)
        .then((docSnapshot) => {
            res.send(docSnapshot.data())
        })
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
}

const getMembershipPlans = async(req, res, next) => {
    try {
        const membershipRef = collection(db, 'memberships');
        await getDocs(membershipRef)
        .then((docSnapshot) => {
            const arr = [];

            docSnapshot.forEach((membership) => {
                arr.push(membership.data());
            });
            res.send(arr);
        })

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Some error occured",
            error: err
        })
    }
} 

module.exports = {
    addMembershipPlan,
    getMembership,
    getMembershipPlans
}