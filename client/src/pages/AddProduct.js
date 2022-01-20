//Add Products

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/Mutations";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddProduct = () => {
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
    input: {
      width: "100%",
      padding: "12px 20px",
      margin: "8px 0",
      boxSizing: "border-box",
    },
    card: {
      margin: "0 auto",
      float: "none",
      marginBottom: "10px",
    },
    button: {
      marginLeft: "10px",
    },
  };

  //Setting input form to have blank values.
  const [formState, setFormState] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    quantity: "",
  });
  const [addProduct, { error, data }] = useMutation(ADD_PRODUCT);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form and send input values to DB to create a new Product
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProduct({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    setFormState({
      image: "",
      name: "",
      desc: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <main className="flex-row justify-center mb-4 text-center">
      <div className="col-12 col-lg-10 justify-center" style={style.card}>
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add Product</h4>
          <div className="card-body" style={style.container}>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the shop.</Link>
              </p>
            ) : (
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
                  type="number"
                  style={style.input}
                  value={formState.price}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Quantity (Numbers Only)"
                  name="quantity"
                  type="number"
                  style={style.input}
                  value={formState.quantity}
                  onChange={handleChange}
                />
                <Button
                  variant="outline-dark"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Upload to Database
                </Button>
                <Link
                  className="btn btn-outline-dark"
                  style={style.button}
                  to="/manageproduct"
                >
                  Cancel
                </Link>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;
