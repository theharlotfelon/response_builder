Resp_Data = require('./models/responseModel');

exports.index = (req, res) => {
    Resp_Data.get((err, data) => {
        if(err) {
            res.json({
                status: "error",
                message: err
            });
        }
        res.json({
            status: "success",
            message: "Responses retrieved successfully",
            data: data
        });
    });
};

const user_id = "5c54631617fbd88ae7f16e53"; // hard coded user, will need to add later

/*exports.new = (req, res) => {
    let rdata = new Resp_Data();
    if(req.body.user_id) {
        rdata.name = req.body.name ? req.body.name : rdata.name;
        rdata.description = req.body.description;
        rdata.user_id = req.body.user_id;

        rdata.save(err => {
            if(err) {
                res.json(err);
            }
            res.json({
                message: 'New response created!',
                data: rdata
            });
        })
    } else {
        res.json({
            message: 'No user_id defined. Unable to create new response.'
        })
    };
};*/

exports.new = (req, res) => {
    let rdata = new Resp_Data();

    rdata.name = req.body.name ? req.body.name : rdata.name;
    rdata.description = req.body.description;
    rdata.user_id = "5c54631617fbd88ae7f16e53"; //change this

    rdata.save(err => {
        if(err) {
            res.json(err);
        }
        res.json({
            message: 'New response created!',
            data: rdata
        });
    })

};

exports.viewAll = (req, res) => {
    Resp_Data.find({user_id: req.params.user_id, _deleted: false}, (err, rdata) => {
        if(err) { res.send(err) }
        res.json({
            message: 'Response details loading..',
            data: rdata
        });
    });
};

exports.view = (req,res) => {
    Resp_Data.findById(req.params._id, (err, rdata) => {
        if(err) {
            res.send(err);
        }
        res.json({
            message: 'Response details loading..',
            data: rdata
        });
    });
};

// Fix this when you get a chance
exports.update = (req, res) => {
    Resp_Data.findById(req.params._id, (err, rdata) => {
        if(err) { res.send(err) }
        rdata.name = req.body.name ? req.body.name : rdata.name;
        rdata.description = req.description;

        rdata.save(err => {
            if(err) { res.json(err) }
            res.json({
                message: 'Response Info updated',
                data: rdata
            });
        });
    });
};

exports.delete = (req, res) => {
    Resp_Data.findById(req.params._id, (err, rdata) => {
        if(err) { res.send(err) }
        rdata._deleted = true;

        rdata.save(err => {
            if(err) { res.json(err) }
            res.json({
                status: 'success',
                message: 'Response deleted'
            });
        });
    });
};

/*
exports.delete = (req, res) => {
    Resp_Data.remove({
        _id: req.params.rdata_id
    }, (err, rdata) => {
        if(err) { res.send(err) };
        rdata._deleted = true;
        res.json({
            status: 'success',
            message: 'Response deleted'
        });
    });
};*/
