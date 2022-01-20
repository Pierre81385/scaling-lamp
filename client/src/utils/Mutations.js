import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $image: String!
    $name: String!
    $desc: String!
    $price: String!
    $quantity: String!
  ) {
    addProduct(
      image: $image
      name: $name
      desc: $desc
      price: $price
      quantity: $quantity
    ) {
      image
      name
      desc
      price
      quantity
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($name: String!) {
    deleteProduct(name: $name) {
      name
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($email: String!) {
    deleteUser(email: $email) {
      email
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $image: String!
    $name: String!
    $desc: String!
    $price: String!
    $quantity: String!
  ) {
    updateProduct(
      image: $image
      name: $name
      desc: $desc
      price: $price
      quantity: $quantity
    ) {
      _id
      image
      name
      desc
      price
      quantity
    }
  }
`;
