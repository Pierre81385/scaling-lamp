import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      name
      email
    }
  }
`;
export const QUERY_SINGLE_USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      email
    }
  }
`;

export const QUERY_USERBYEMAIL = gql`
  query User($userEmail: String!) {
    userByEmail(userEmail: $userEmail) {
      _id
      name
      email
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query allProducts {
    products {
      _id
      image
      name
      desc
      price
      quantity
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query Product($productId: ID!) {
    product(productId: $productId) {
      _id
      image
      name
      desc
      price
      quantity
    }
  }
`;
