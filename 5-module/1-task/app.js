const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

router.get('/subscribe', async (ctx, next) => {
  ctx.body = await new Promise((resolve, reject) => {
    console.log(1);
    resolve();
  });

  return await next();
});

router.post('/publish', async (ctx, next) => {
  console.log(2);
  ctx.body = ctx.request.body.message;
});

app.use(router.routes());

module.exports = app;
