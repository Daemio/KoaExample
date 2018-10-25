const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const {connect: connectToDB} = require('./utils/dbUtils');
const seanceRouter = require('./routes/seanceRouter');

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(seanceRouter.routes());

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectToDB();
});