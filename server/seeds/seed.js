const db = require("../config/connection");
const { User, Product } = require("../models");

const userData = require("./userSeeds.json");
const productData = require("./productSeeds.json");

db.once("open", async () => {
  if (User) {
    await db.collection("users").deleteMany;
  }

  if (Product) {
    await db.collection("products").deleteMany;
  }

  const users = await db.collection("users").insertMany(userData);
  const products = await db.collection("products").insertMany(productData);

  console.log("Users and Products seeded!");
  process.exit(0);
});
