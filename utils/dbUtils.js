const mongoose = require('mongoose');
const dbConfig = require('../config').db;
const User = require('../models/user');
const Doctor = require('../models/doctor');
const Seance = require('../models/seance');

async function connect() {
    try{
        await mongoose.connect(`mongodb://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}`,
            { useNewUrlParser: true });
        console.log('Connected to DB');
    } catch (err) {
        console.log(`Failed to connect to DB\nReason:${JSON.stringify(err)}`)
    }
}

function disconnect() {
    mongoose.disconnect();
}

function createUser(userData) {
    const {name, phone} = userData;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        phone
    });

    return user.save();
}

function createDoctor(doctorData) {
    const {name, spec} = doctorData;
    const doctor = new Doctor({
        _id: new mongoose.Types.ObjectId(),
        name,
        spec
    });

    return doctor.save();
}

function createSeance(seanceData) {
    const {doctor_id, slot, cabinet} = seanceData;
    const seance = new Seance({
        _id: new mongoose.Types.ObjectId(),
        user_id: null,
        doctor_id,
        slot,
        cabinet,
        available: true
    });

    return seance.save();
}

function getDoctor(id) {
    return Doctor.findById(id).exec();
}

function getDoctors() {
    return Doctor.find({}).exec();
}

function getUser(id) {
    return User.findById(id).exec();
}

function getSeance(id) {
    return Seance.findById(id).exec();
}

function appointSeance({seance_id, user_id}) {
    return Seance.findByIdAndUpdate(seance_id, {$set: {user_id, available: false}}).exec();
}

function cancelSeance(seance_id) {
    return Seance.findByIdAndUpdate(seance_id, {$set: {user_id: null, available: true}}).exec();
}

module.exports = {connect, disconnect, createUser,
     createDoctor, getDoctor, getSeance, getUser, createSeance,
    appointSeance, cancelSeance, getDoctors}