const uuid = require('uuid/v4');
const User = require('../models/User');
const sendMail = require('../libs/sendMail');
const Session = require('../models/Session');

module.exports.register = async (ctx, next) => {
  const token = uuid();

  const existedUser = await User.findOne({email: ctx.request.body.email});

  if (existedUser) {
    ctx.status = 400;
    ctx.body = {errors: {email: 'Такой email уже существует'}};
    return;
  }

  const user = await new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.displayName,
    password: ctx.request.body.password,
    verificationToken: token,
  });

  await user.setPassword(ctx.request.body.password);

  await user.save();

  ctx.status = 200;
  ctx.body = {status: 'ok'};

  await sendMail({
    template: 'confirmation',
    locals: {token: token},
    to: user.email,
    subject: 'Подтвердите почту',
  });
};

module.exports.confirm = async (ctx, next) => {
  const user = await User.findOneAndUpdate({verificationToken: ctx.request.body.verificationToken});

  if (!user) {
    ctx.body = {error: 'Ссылка подтверждения недействительна или устарела'};
    return;
  }

  user.set('verificationToken', undefined);
  await user.save();

  const token = uuid();

  ctx.status = 200;
  ctx.body = {token};
};
