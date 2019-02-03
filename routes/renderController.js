let Response = require('../models/responseModel');

// Message for Default URL
exports.index = (req, res) => {
    Response.find({user_id: "5c54631617fbd88ae7f16e53", _deleted: false},
    (err, responses) => {
        if(err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'Response Builder',
                responses: responses
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
    let rdata = new Response();

    rdata.name = req.body.name ? req.body.name : rdata.name;
    rdata.description = req.body.description;
    rdata.user_id = "5c54631617fbd88ae7f16e53"; //change this

    rdata.save(err => {
        if(err) {
            res.json(err);
            return;
        } else {
            console.log(rdata);
            res.redirect('/')
        };
    });
};