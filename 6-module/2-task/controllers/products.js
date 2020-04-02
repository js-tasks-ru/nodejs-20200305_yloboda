const Product = require('../models/Product');
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const products = ctx.query.subcategory ?
    await Product.find({subcategory: ctx.query.subcategory}) :
    await Product.find({});

  const productsMapped = products.map((product) => ({
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  }));

  ctx.body = {products: productsMapped};

  next();
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find();

  if (!products) ctx.body = {products: []};

  const productsMapped = products.map((product) => ({
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description,
  }));

  ctx.body = {products: productsMapped};
  next();
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.Types.ObjectId.isValid(ctx.params.id)) ctx.throw(400,'Error Message');

  const product = await Product.findOne({_id: ctx.params.id});

  if (!product) ctx.throw(404,'Not found');

  const productsMapped = {
    ...product,
    id: product.id,
  }

  ctx.body = {product: productsMapped};
  next();
};

