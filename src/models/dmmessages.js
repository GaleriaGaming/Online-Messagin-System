const mongoose = require('mongoose');
const { Schema } = mongoose;

const dmMessage = new Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Message', dmMessage);