const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

const checkIsReady = () => {
  return new Promise((resolve, reject) => {
    resolver = resolve;
  });
};

const sendMessage = (msg) => {
  resolver(msg);
  delayObj = checkIsReady();
};

let resolver;
let delayObj = checkIsReady();

router.get('/subscribe', async (ctx, next) => {
  ctx.body = await delayObj;
  return next();
});

router.post('/publish', async (ctx, next) => {
  const msg = ctx.request.body.message;
  if (msg) {
    sendMessage(msg);
  }
  ctx.body = '';
  return next();
});

app.use(router.routes());

module.exports = app;
