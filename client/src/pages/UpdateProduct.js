import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_SINGLE_PRODUCT } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

function UpdateProduct() {
  //get name of product to be updated from localstorage
  let updateProduct = localStorage.getItem("nameOfUpdateProduct");

  console.log(updateProduct);

  const { data, loading, error } = useQuery(QUERY_SINGLE_PRODUCT, {
    variables: { productName: localStorage.getItem("nameOfUpdateProduct") },
  });

  console.log(data);

  return <div>in progress</div>;
}

export default UpdateProduct;
