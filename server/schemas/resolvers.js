const {
  ProvidedRequiredArgumentsOnDirectivesRule,
} = require("graphql/validation/rules/ProvidedRequiredArgumentsRule");
const { User } = require("../models");
const { Product } = require("../models");
const { findById } = require("../models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    products: async () => {
      return Product.find();
    },
    user: async (parent, { userId }) => {
      return User.findById({ _id: userId });
    },
    userByEmail: async (parent, { userEmail }) => {
      return User.findOne({ email: userEmail });
    },
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      // First we create the user
      const user = await User.create({ name, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);
      //localStorage.setItem(id, user.id);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    addProduct: async (parent, { image, name, desc, price, quantity }) => {
      // Create product
      const product = await Product.create({
        image,
        name,
        desc,
        price,
        quantity,
      });
      return { product };
    },
    deleteProduct: async (parent, args) => {
      const { name } = args;
      console.log("Product " + name + " Deleted");
      await Product.findOneAndRemove({ name: name });
    },
    updateProduct: async (parent, { image, name, desc, price, quantity }) => {
      const prod = Product.findOneAndUpdate(
        { name: name },
        {
          image,
          name,
          desc,
          price,
          quantity,
        }
      );
      console.log("Product " + prod.name + " found!");
      if (!prod) {
        throw new Error("Could not find product with name: " + name);
      }
      prod.image = image;
      prod.name = name;
      prod.desc = desc;
      prod.price = price;
      prod.quantity = quantity;

      return prod;
    },
  },
};

//ALERT: Make any changes here, and reinstall node modules in client

module.exports = resolvers;
