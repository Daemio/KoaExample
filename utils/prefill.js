const db = require('./dbUtils');

const users = [
    {
        name: "Vasya",
        phone: "+79811111111"
    },
    {
        name: "Dima",
        phone: "+79812222222"
    },
    {
        name: "Olya",
        phone: "+79813333333"
    },
    {
        name: "Katya",
        phone: "+79814444444"
    }
];

const doctors = [
    {
        name: "Dr Helen",
        spec: "Dentist"
    },
    {
        name: "Dr Alex",
        spec: "Oculist"
    },
    {
        name: "Dr Mike",
        spec: "Surgeon"
    }
];

const dates = [
    new Date(2018, 10, 28, 9, 0),
    new Date(2018, 10, 28, 10, 0),
    new Date(2018, 10, 28, 11, 0),
    new Date(2018, 10, 29, 9, 0),
    new Date(2018, 10, 29, 10, 0)
]

async function prefill() {
    try {
        db.connect();

        await Promise.all([
            db.createUser(users[0]),
            db.createUser(users[1]),
            db.createUser(users[2]),
            db.createUser(users[3]),
            db.createDoctor(doctors[0]),
            db.createDoctor(doctors[1]),
            db.createDoctor(doctors[2])
        ]);

        await _createSeances();

        console.log(`Some data is inserted in Users/Doctors/Seances collections`);
    } catch (err) {
        console.log(`There was an error during DB prefill.\n${err}`);
    }

    db.disconnect();
}

async function _createSeances() {
    const docs = await db.getDoctors();

    return Promise.all([
        db.createSeance({
            doctor_id: docs[0]._id,
            slot: dates[0],
            cabinet: 1
        }),

        db.createSeance({
            doctor_id: docs[0]._id,
            slot: dates[1],
            cabinet: 10
        }),

        db.createSeance({
            doctor_id: docs[0]._id,
            slot: dates[3],
            cabinet: 1
        }),

        db.createSeance({
            doctor_id: docs[1]._id,
            slot: dates[3],
            cabinet: 2
        }),

        db.createSeance({
            doctor_id: docs[1]._id,
            slot: dates[2],
            cabinet: 3
        }),

        db.createSeance({
            doctor_id: docs[2]._id,
            slot: dates[4],
            cabinet: 7
        })
    ]);
}

prefill();


