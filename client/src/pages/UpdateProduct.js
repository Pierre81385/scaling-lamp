import React, { setState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

function UpdateProduct() {
  return <div className="text-center">Update functionality comming soon!</div>;
}

export default UpdateProduct;