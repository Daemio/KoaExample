const mongoose = require('mongoose');

const seanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Doctor'
    },

    available: {
        type: Boolean,
        required: true
    },

    slot: {
        type: mongoose.Schema.Types.Date
    },
    cabinet: {
        type: Number,
        validate : {
            validator : (value) => Number.isInteger(value),
            message   : '{VALUE} is not a correct cabinet number'
        } 
    }
});

module.exports = mongoose.model('Seance', seanceSchema);