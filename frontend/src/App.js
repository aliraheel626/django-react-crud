import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
const apiUrl = "http://http://20.62.193.112:8000/items";

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", quantity: "" });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get(apiUrl);
    setItems(response.data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`${apiUrl}/`, formData);
    setFormData({ name: "", quantity: "" });
    fetchItems();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    fetchItems();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-group my-4">
        <div className="row">
          <div className="col">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="form-control"
            />
          </div>
          <div className="col">
            <input
              type="number"
              name="quantity"
              data-type="integer"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              className="form-control"
            />
          </div>
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                formData.name.trim().length === 0 &&
                formData.quantity.trim().length === 0
              }
            >
              Submit
            </button>
          </div>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
                <ModalButton
                  setItems={setItems}
                  id={item.id}
                  name={item.name}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ModalButton = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({ name: props.name, quantity: "" });

  const fetchItems = async () => {
    const response = await axios.get(apiUrl);
    props.setItems(response.data);
  };

  const handleSubmit = async (id) => {
    console.log(formData);
    await axios.put(`${apiUrl}/${id}/`, formData);
    await setFormData({ name: props.name, quantity: "" });
    fetchItems();
    await handleClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="form-group my-4">
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  name="quantity"
                  data-type="integer"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className="form-control"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(props.id);
            }}
            disabled={formData.quantity.trim().length === 0}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default App;
