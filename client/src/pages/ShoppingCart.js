import React from "react";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { useQuery } from "@apollo/client";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function ShoppingCart() {
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
    h1: {
      width: "300px",
    },
    button: {
      marginLeft: "10px",
    },
  };

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const product = data?.products || {};

  const productArray = [];

  const purchasedArray = [];

  for (var i = 0; i < product.length; i++) {
    const aProduct = Array.isArray(product) && product.length ? product[i] : {};
    productArray.push(aProduct);
    //console.log(productArray[i].name);
    if (localStorage.getItem(productArray[i].name) > 0) {
      purchasedArray.push({
        name: productArray[i].name,
        amount: localStorage.getItem(productArray[i].name),
      });
      console.log("purchasedArray contains: " + JSON.stringify(purchasedArray));
      localStorage.setItem("purchased", purchasedArray);
    }
  }

  const renderCard = (oneProduct) => {
    if (localStorage.getItem(oneProduct.name) > 0) {
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
              <p>
                Total Price: $
                {oneProduct.price * localStorage.getItem(oneProduct.name)}
              </p>
              <p>Purchase Quantity: {localStorage.getItem(oneProduct.name)}</p>
            </Card.Body>
            <Card.Footer className="text-center" style={{ paddingTop: "10px" }}>
              <Button id="addCart" variant="outline-dark">
                Delete
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      );
    }
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          {productArray.map(renderCard)}
        </Row>
      </Container>
      <div className="text-center">
        <Button id="checkout" variant="outline-dark" style={style.button}>
          CHECKOUT
        </Button>
        <Link className="btn btn-outline-dark" to="/" style={style.button}>
          BACK
        </Link>
      </div>
    </div>
  );
}

export default ShoppingCart;
