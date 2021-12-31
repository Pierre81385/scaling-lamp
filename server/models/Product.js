const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  inventory: {
    type: Number,
  },
  price: {
    type: Number,
  },
  instock: {
    type: Boolean,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
