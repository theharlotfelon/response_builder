let Response = require('../models/responseModel');

// Message for Default URL
exports.index = (req, res) => {
    Response.find({user_id: "5c54631617fbd88ae7f16e53", _deleted: false},
    (err, responses) => {
        if(err) {
            console.log(err);
        } else {
            responses.sort((a, b) => (a.name > b.name) ? 1 : -1)
;            res.render('index', {
                title: 'Response Builder',
                responses: responses,
                calculateTime: function(c,u) {
                    let d, t = 86400000;
                    (u) ? d = Date.now() - u.getTime() : d = Date.now() - c.getTime();
                    d = Math.floor(d/t);
                    if(d<1) {
                        d = 'Updated today'
                    } else if (d > 30) {
                        d = ''
                    } else if(d < 2) {return "Updated " + d +" day ago"} else {return "Updated " +  d + " days ago"}
                    return d;
                }
        });
    };

    });
};

exports.pageResponse = (req, res) => {
    res.render('add_response', {
        title: 'Add Response'
    });
};

exports.addResponse = (req, res) => {
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'Description is required').notEmpty();

    // Get Errors
    let errors = req.validationErrors();

    if(errors) {
        res.render('add_response', {
            title:'Add Response',
            errors:errors
        });
    } else {
        let response = new Response();

        response.name = req.body.name ? req.body.name : response.name;
        response.description = req.body.description;
        response.user_id = "5c54631617fbd88ae7f16e53"; //change this

        response.save(err => {
            if(err) {
                console.log(err);
                return;
            } else {
                console.log(response); // think about removing
                req.flash('success', 'Article Added');
                res.redirect('/')
            };
        });
    }
};

exports.getById = (req, res) => {
    Response.findById(req.params.id, (err, response) => {
        if(err) {
            res.send(err);
        }
        res.render('response', {
            response:response
        });
    });
}

exports.editResponse = (req, res) => {
    Response.findById(req.params.id, (err, response) => {
        if(err) {
            res.send(err);
        }
        res.render('edit_response', {
            title: 'Edit Response',
            response:response
        });
    });
}

exports.update = (req, res) => {
    let response = {};
    response.name = req.body.name;
    response.description = req.body.description;
    response.updated = Date.now();

    let query = {_id: req.params.id}
    Response.updateOne(query, response, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    })
}

exports.delete = (req, res) => {
    let response = {};
    response._deleted = true;
    response.updated = Date.now();

    let query = {_id: req.params.id}
    Response.update(query, response, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    })
}

