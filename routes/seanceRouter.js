const Router = require('koa-router');
const {appointSeance, cancelSeance} = require('../utils/dbUtils');

const seanceRouter = new Router();

seanceRouter.post('/appoint_seance', async (ctx) => { //по-хорошему id юзера нужно брать из токена
    //предварительно пройдя middleware аутентификации
    const seanceParams = {user_id, seance_id} = ctx.request.body;
    try {
        await appointSeance(seanceParams); //добавить валидацию параметров(минимум наличие), проверку занятости сеанса, но это завтра 
        ctx.status = 200;
        ctx.body = {message: "ok"}
    } catch (err) {
        ctx.status = 500;
        ctx.body = {message:"Could not appoint seance", error: err}
    }
});

seanceRouter.post('/cancel_seance', async (ctx) => { //тут это еще важней, так как мы можем отменять чужые сеансы
    const seanceParams = {user_id, seance_id} = ctx.request.body;
    try {
        await cancelSeance(seance_id);
        ctx.status = 200;
        ctx.body = {message: "ok"}
    } catch (err) {
        ctx.status = 500;
        ctx.body = {message:"Could not cancel seance", error: err}
    }
});

module.exports = seanceRouter;