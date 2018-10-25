const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        validate : {
            validator : (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
            message   : '{VALUE} is not a correct phone number'
        }
    }
});

module.exports = mongoose.model('User', userSchema);