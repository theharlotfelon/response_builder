let User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is no valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors) {
        res.render('register', {
            errors:errors
        });
    } else {
       let newUser = new User({
           name:name,
           email:email,
           password:password,
           username:email
       });

       bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) {
                   console.log(err)
               }
               newUser.password = hash;
               newUser.save(err => {
                   if(err) {
                       console.log(err);
                       return;
                   } else {
                       req.flash('success','You are now registered and can log in');
                       res.redirect('/users/login');
                   }
               })
           });
       });
    };
}