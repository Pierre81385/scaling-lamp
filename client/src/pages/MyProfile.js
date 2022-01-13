//Update and Delete Users
import React, { setState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS, QUERY_USERS } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

function DeleteProfile() {
  return (
    <div className="text-center">User profile functionality comming soon!</div>
  );
}

export default DeleteProfile;
