import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { QUERY_SINGLE_PRODUCT } from "../utils/Queries";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_PRODUCT } from "../utils/Mutations";

import Auth from "../utils/Auth";
import { Link } from "react-router-dom";

function UpdateProduct() {
  //get vales of product to be updated from localstorage
  let updateProductName = localStorage.getItem("nameOfUpdateProduct");
  let updateProductImage = localStorage.getItem("imageOfUpdateProduct");
  let updateProductDesc = localStorage.getItem("descOfUpdateProduct");
  let updateProductPrice = localStorage.getItem("priceOfUpdateProduct");
  let updateProductQuantity = localStorage.getItem("quantityOfUpdateProduct");

  //set state with initial values
  const [formState, setFormState] = useState({
    image: updateProductImage,
    name: updateProductName,
    desc: updateProductDesc,
    price: updateProductPrice,
    quantity: updateProductQuantity,
  });

  const [updateProduct, { error, data }] = useMutation(UPDATE_PRODUCT);

  //update state with new values when they're changed
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //submit run find and update
  const handleFormSubmit = async (event) => {
    console.log("handleFormSubmit button pressed");

    event.preventDefault();
    console.log(formState);

    try {
      const { data } = updateProduct({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }
  };

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
    input: {
      width: "100%",
      padding: "12px 20px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    cardForm: {
      margin: "0 auto",
      float: "none",
      marginBottom: "10px",
    },
  };

  return (
    <div style={{ maxWidth: "100vw", overflowX: "hidden" }}>
      {/* Product Preview */}
      <Container style={style.container} fluid>
        <Row xs={1} sm={2} md={3} className="g-4">
          <Col>
            <Card style={style.card}>
              <Card.Img
                variant="top"
                src={updateProductImage}
                className="img-responsive center-block"
              />
              <Card.Body>
                <Card.Title>{updateProductName}</Card.Title>
                <Card.Text>{updateProductDesc}</Card.Text>
                <p>${updateProductPrice}</p>
                <p>Quantity Availible: {updateProductQuantity}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Update Form */}
      <div className="flex-row justify-center mb-4 text-center">
        <div className="col-12 col-lg-10 justify-center" style={style.cardForm}>
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2">
              Update Product
            </h4>
            <div className="card-body" style={style.container}>
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Image URL"
                  name="image"
                  type="text"
                  style={style.input}
                  value={formState.image}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  style={style.input}
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product Description"
                  name="desc"
                  type="text"
                  style={style.input}
                  value={formState.desc}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Price (Numbers Only"
                  name="price"
                  type="text"
                  style={style.input}
                  value={formState.price}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Quantity (Numbers Only)"
                  name="quantity"
                  type="text"
                  style={style.input}
                  value={formState.quantity}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-dark"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Update
                </Button>
                <Link
                  className="btn btn-outline-dark"
                  style={style.button}
                  to="/manageproduct"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
