const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
  }

  type Product {
    _id: ID
    image: String
    name: String
    desc: String
    price: Int
    quantity: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User!
    products: [Product]
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProduct(
      image: String!
      name: String!
      desc: String!
      price: String!
      quantity: String!
    ): Product
    deleteProduct(name: String!): Product
  }
`;

//ALERT: Make any changes here, and reinstall node modules in client

module.exports = typeDefs;
