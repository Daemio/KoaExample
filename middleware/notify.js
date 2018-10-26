const moment = require('moment');
const logger = require('../logger');
const db = require('../utils/dbUtils');

module.exports = async(ctx) => {
    const {user_id, seance_id} = ctx;
    const user = await(db.getUser(user_id));
    const seance = await db.getSeance(seance_id);
    const doctor = await db.getDoctor(seance.doctor_id);

    const date = seance.slot;
    const spec = doctor.spec;
    const userName = user.name;
    const cabinet = seance.cabinet;

    const time = moment(date).format("hh:mm");

    const dateBeforeOneDay = moment(date).subtract(1, 'days');
    logger.info(`[${ dateBeforeOneDay }] Привет ${userName}!
Напоминаем, что вы записаны к ${spec} завтра в ${time} в ${cabinet} кабинет!`);

    const dateBeforeTwoHours = moment(date).subtract(2, 'hours');
    logger.info(`[${ dateBeforeTwoHours }] Привет ${userName}!
Вам через 2 часа к ${spec} в ${time} в ${cabinet} кабинет!`);
}