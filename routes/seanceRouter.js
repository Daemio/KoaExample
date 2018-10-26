const Router = require('koa-router');
const {appointSeance, cancelSeance, getSeance} = require('../utils/dbUtils');
const notify = require('../middleware/notify');

const seanceRouter = new Router();

seanceRouter.post('/appoint_seance',
    paramsValidationMiddleware, 
    async (ctx, next) => { //по-хорошему id юзера нужно брать из токена
        //предварительно пройдя middleware аутентификации и вообще как минимум посты должны быть защищенными
        try {
            const seance = await getSeance(ctx.seance_id);

            if(!seance.available) {
                ctx.status = 403;
                ctx.body = {
                    message: "Error: Could not appoint seance",
                    error: "Seance slot is busy"
                };
                return;
            }

            await appointSeance({
                seance_id: ctx.seance_id,
                user_id: ctx.user_id
            });

            await next(ctx);
            ctx.status = 200;
            ctx.body = {message: "Successfully appointed seance", seance_id: seance._id}
        } catch (error) {
            ctx.status = 500;
            ctx.body = {message: "Error: Could not appoint seance", error}
        }
    },
    notify);

seanceRouter.post('/cancel_seance', 
    paramsValidationMiddleware,
    async (ctx) => { //тут это еще важней, так как мы можем отменять чужые сеансы, зная _id
        try {
            const seance = await getSeance(ctx.seance_id);

            if(ctx.user_id != seance.user_id) { //так хотя бы нельзя будет отменить чужой сеанс, не зная чужой id, но опять же
                ctx.status = 403;
                ctx.body = {
                    message: "Error: Could not cancel seance", 
                    error: "You can only cancel seances you appointed"
                };
                return;
            }

            await cancelSeance(ctx.seance_id);
            ctx.status = 200;
            ctx.body = {message: "Successfully canceled seance", seance_id: seance._id}
        } catch (error) {
            ctx.status = 500;
            ctx.body = {message: "Could not cancel seance", error}
        }
    });

function paramsValidationMiddleware(ctx, next) {
    const {user_id, seance_id} = ctx.request.body;
    const missing = [];
    if(!user_id) {
        missing.push('{user_id}');
    }
    if(!seance_id) {
        missing.push('{seance_id}');
    }
    if(missing.length > 1){
        ctx.status = 400;
        ctx.body = {message: `Missing required parameter(s) ${missing}`};
        return;
    } else {
        ctx.user_id = user_id;
        ctx.seance_id = seance_id;
        return next(ctx);
    }
}
module.exports = seanceRouter;