const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    spec: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);