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
    quantity: Int
    inventory: Int
    price: Int
    instock: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    products: [Product]
    product(productId: ID!): Product
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProduct(
      image: String!
      name: String!
      desc: String!
      quantity: Int!
      inventory: Int!
      price: Int!
      instock: Boolean!
    ): Product
  }
`;

module.exports = typeDefs;
