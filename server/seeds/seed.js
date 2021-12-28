const db = require("../config/connection");
const { User } = require("../models");

const userData = require("./userSeeds.json");

db.once("open", async () => {
  if (User) {
    await db.collection("users").deleteMany;
  }

  const users = await db.collection("users").insertMany(userData);

  console.log("Users seeded!");
  process.exit(0);
});
