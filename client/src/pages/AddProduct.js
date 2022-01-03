//Add Products

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/Mutations";
import { Link } from "react-router-dom";

const AddProduct = () => {
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

  // submit form
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
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Add Product</h4>
          <div className="card-body">
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
                  value={formState.image}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product Description"
                  name="desc"
                  type="text"
                  value={formState.desc}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Price (Numbers Only"
                  name="price"
                  type="text"
                  value={formState.price}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Quantity (Numbers Only)"
                  name="quantity"
                  type="text"
                  value={formState.quantity}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Upload to Database
                </button>
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
