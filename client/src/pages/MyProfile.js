//Update and Delete Users
import React, { setState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { QUERY_USERBYEMAIL } from "../utils/Queries";
import { useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";
import { DELETE_USER } from "../utils/Mutations";

function DeleteProfile() {
  const currentUserEmail = localStorage.getItem("email");

  const [deleteUser] = useMutation(DELETE_USER);

  const style = {
    container: {
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%", // make sure the parent is full screen
      height: "100%", // so that the content will center correctly
      paddingTop: "25px",
      paddingBottom: "25px",
    },
    img: {
      width: "300px",
    },
    card: {
      marginRight: "auto",
      marginLeft: "auto",
      boxShadow: "0 15px 25px rgba(129, 124, 124, 0.2)",
      borderRadius: "5px",
      backdropFilter: "blur(7px)",
      backgroundColor: "rgba(0, 0, 0, 0)",
      padding: "10px",
      textAlign: "center",
      width: "18rem",
      color: "black",
    },
    button: {
      marginLeft: "10px",
    },
    table: {
      margin: "0 auto",
    },
    tdLeft: {
      textAlign: "right",
      paddingleft: "15px",
      width: "500px",
    },
    tdRight: {
      paddingLeft: "15px",
      width: "500px",
    },
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      {/* Product Preview */}
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          <Col>
            <Card style={style.card}>
              <Card.Body>
                <Card.Title>CURRENT USER</Card.Title>
                <Card.Text>{currentUserEmail}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="text-center">
        <Button
          variant="outline-dark"
          style={style.button}
          onClick={() => {
            deleteUser({ variables: { email: currentUserEmail } });
            Auth.logout();
            localStorage.removeItem("email");
            window.location.href = "/";
          }}
        >
          Delete Profile
        </Button>

        <Button
          variant="outline-dark"
          style={style.button}
          onClick={() => {
            alert("Password Reset Request sent to your profile email!"); //future development
          }}
        >
          Request Password Reset
        </Button>
        <Link className="btn btn-outline-dark" style={style.button} to="/">
          Cancel
        </Link>
      </div>
    </div>
  );
}

export default DeleteProfile;
