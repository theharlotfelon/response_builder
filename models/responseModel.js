const mongoose = require('mongoose');

const responseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    _deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    updated: {
        type: Date,
        default: Date.now()
    }
});

const Response = module.exports = mongoose.model('response',responseSchema);

module.exports.get = (callback, limit) => {
    Response.find(callback).limit(limit);
}