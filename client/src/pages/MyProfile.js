//Update and Delete Users
import React, { setState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_USERBYEMAIL } from "../utils/Queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

function DeleteProfile() {
  return (
    <div className="text-center">
      Active user displayed here. Retrieve active user ID, query database for
      user by ID, display as card here.
    </div>
  );
}

export default DeleteProfile;
