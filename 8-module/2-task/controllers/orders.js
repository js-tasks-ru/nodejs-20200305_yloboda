const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async function checkout(ctx, next) {
  const order = await Order.create({
    user: ctx.user,
    product: ctx.request.body.product,
    address: ctx.request.body.address,
    phone: ctx.request.body.phone,
  });

  await sendMail({
    template: 'confirmation',
    locals: {
      id: order._id,
      product: ctx.request.body.product,
    },
    to: ctx.user.email,
    subject: 'You make order',
  });

  ctx.body = {order: order._id};

  return next();
};

module.exports.getOrdersList = async function ordersList(ctx, next) {
  const orders = await Order.find({user: ctx.user.id});
  ctx.status = 200;
  ctx.body = {orders: orders};
  return next();
};
