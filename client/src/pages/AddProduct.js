import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../utils/Mutations";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [formState, setFormState] = useState({
    iamge: "",
    name: "",
    desc: "",
    quantity: "",
    inventory: "",
    price: "",
    instock: "",
  });
  const [addProduct, { error, data }] = useMutation(ADD_PRODUCT);

  const handleChange = (event) => {
    const { name, image, value } = event.target;

    setFormState({
      ...formState,
      [image]: value,
      [name]: value,
    });
  };

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
                Success! You may now head{" "}
                <Link to="/">back to the product shop page.</Link>
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
                  placeholder="Product name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product desc"
                  name="description"
                  type="text"
                  value={formState.desc}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product quantity"
                  name="quantity"
                  type="int"
                  value={formState.quantity}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product inventory"
                  name="inventory"
                  type="number"
                  value={formState.inventory}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Product price"
                  name="price"
                  type="number"
                  value={formState.desc}
                  onChange={handleChange}
                />
                <select value={formState.instock} onChange={handleChange}>
                  <option selected value>
                    Yes
                  </option>
                  <option value>No</option>
                </select>
                <input
                  className="form-input"
                  placeholder="Product stock status"
                  name="stock"
                  type="boolean"
                  value={formState.desc}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
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
