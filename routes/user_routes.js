const router = require('express').Router();
const User = require('../models/user');
const userController = require('./userController');

// Register Form
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.route('/register')
    .post(userController.register)

module.exports = router;