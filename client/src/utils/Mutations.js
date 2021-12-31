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
    $quantity: numnber!
    $inventory: number!
    $price: number!
    $instock: Boolean!
  ) {
    addProduct(
      image: $image
      name: $name
      desc: $desc
      quantity: $quantity
      inventory: $inventory
      price: $price
      instock: $instock
    ) {
      product {
        _id
        name
      }
    }
  }
`;
