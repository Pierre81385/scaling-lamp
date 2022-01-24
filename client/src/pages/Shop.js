//Display products

import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_PRODUCTS } from "../utils/Queries";
import { useQuery } from "@apollo/client";
import Auth from "../utils/Auth";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Shop() {
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
  };

  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const product = data?.products || {};

  const productArray = [];

  for (var i = 0; i < product.length; i++) {
    const aProduct = Array.isArray(product) && product.length ? product[i] : {};
    productArray.push(aProduct);
    //console.log(productArray[i].name);
    if (localStorage.getItem(productArray[i].name) === null) {
      localStorage.setItem(productArray[i].name, 0);
    }
  }

  const [cart, addToCart] = useState({
    name: "",
    amount: 0,
  });

  const [count, setCount] = useState(1);

  useEffect(() => {
    console.log(`Purchase clicked ${count} times`);
  });

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
            <p>In cart:{localStorage.getItem(oneProduct.name)}</p>
          </Card.Body>
          <Card.Footer className="text-center" style={{ paddingTop: "10px" }}>
            {!Auth.loggedIn() ? (
              <>
                <Link className="btn btn-outline-dark" to="/login">
                  Login to Purchase
                </Link>
              </>
            ) : (
              <>
                <Button
                  id="addCart"
                  variant="outline-dark"
                  onClick={() => {
                    setCount(count + 1);

                    addToCart({
                      ...cart,
                      name: oneProduct.name,
                      amount: count,
                    });

                    console.log("addToCart has name " + cart.name);
                    console.log("addToCart has amount " + cart.amount);

                    var purchaseQantity = cart.amount;

                    if (cart.name === "") {
                      cart.name = oneProduct.name;
                      purchaseQantity = 0;
                    } else if (cart.name != oneProduct.name) {
                      cart.name = oneProduct.name;
                      purchaseQantity = 0;
                    } else {
                      purchaseQantity = localStorage.getItem(oneProduct.name);
                    }

                    console.log(
                      "value of purchaseQuantity is " + purchaseQantity
                    );

                    localStorage.setItem(cart.name, ++purchaseQantity);
                  }}
                >
                  Add to Cart
                </Button>
              </>
            )}
          </Card.Footer>
        </Card>
      </Col>
    );
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          {productArray.map(renderCard)}
        </Row>
      </Container>
    </div>
  );
}

export default Shop;
