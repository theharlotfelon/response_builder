const router = require('express').Router();
const User = require('../models/user');

// Register Form
router.get('/register', (req, res) => {
    res.render('register', (err, html) => {
        if(err) {console.log(err)}
        res.send(html);
    });
})

module.exports = router;