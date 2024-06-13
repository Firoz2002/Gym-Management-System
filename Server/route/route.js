const express = require('express');

const { login } = require('../controllers/login-controller');
const { adminAuth, islogged } = require('../middlewares/auth');
const { addMembershipPlan, getMembershipPlans, getMembership} = require('../controllers/membership-controller');
const { addMember, getMember, getMembers, removeMember } = require('../controllers/member-controller');

const router = express.Router();

const { scheduleBilling } = require('../middlewares/billing');
router.route('/test').get((req, res) => {
    scheduleBilling({
        name: "Jhon Doe",
        email: "a@gmail.com",
        gymId: "12345",
        membership: "Basic"
    })
});

router.route('/monthly-bills').get((req, res) => {res.render('billing')});

router.route('/islogged').get(islogged);
router.route('/login/:id').get(login);

router.route('/getMember').get(getMember);

router.route('/members').get(adminAuth ,(req, res) => {res.render('members')});
router.route('/getMembers').get(adminAuth, getMembers);
router.route('/add-member').post(adminAuth, addMember);
router.route('/removeMember').delete(adminAuth, removeMember);

router.route('/membership-plans').get(adminAuth, (req, res) => {res.render('memberships')});
router.route('/add-membership-plan').post(adminAuth, addMembershipPlan);
router.route('/get-membership/:id').get(getMembership);
router.route('/get-membership-plans').get(adminAuth, getMembershipPlans);

router.route('/profile').get(islogged, (req, res) => {res.render('profile')});

module.exports = router;