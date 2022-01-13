import React, { setState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";
import { DELETE_PRODUCT } from "../utils/Mutations"; //add product added

function DeleteProduct() {
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
  };

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const product = data?.products || {};

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleClick = () => {
    console.log("Delete Product Button Pressed");
  };

  const renderCard = (oneProduct) => {
    return (
      <Col>
        <Card style={style.card} key={oneProduct.id}>
          <Card.Img
            variant="top"
            src={oneProduct.image}
            className="img-responsive center-block"
          />
          <Card.Body>
            <Card.Title>{oneProduct.name}</Card.Title>
            <Card.Text>{oneProduct.desc}</Card.Text>
            <p>${oneProduct.price}</p>
            <p>Quantity Availible: {oneProduct.quantity}</p>
          </Card.Body>
          <Card.Footer className="text-center" style={{ paddingTop: "10px" }}>
            {!Auth.loggedIn() ? (
              <>
                <Link className="btn btn-outline-dark" to="/login">
                  Login to Change
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-dark"
                  style={style.link}
                  to="/updateproduct"
                >
                  Update
                </Link>
                <Button
                  variant="outline-dark"
                  style={style.button}
                  onClick={() => {
                    deleteProduct({ variables: { name: oneProduct.name } });
                    handleClick();
                  }}
                >
                  Delete
                </Button>
              </>
            )}
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  const productArray = [];

  for (var i = 0; i < product.length; i++) {
    const aProduct = Array.isArray(product) && product.length ? product[i] : {};
    productArray.push(aProduct);
  }

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <div className="text-center">
        <Link
          className="btn btn-outline-dark"
          style={style.link}
          to="/addproduct"
        >
          Add Product
        </Link>
      </div>
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          {productArray.map(renderCard)}
        </Row>
      </Container>
    </div>
  );
}

export default DeleteProduct;