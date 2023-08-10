import React, { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const CustomersPage = observer(() => {
  const { customers } = useContext(Context);
  const [isValid, setValid] = useState(false);
  const [cusArray, setCusArray] = useState([]);

  //remove customer
  const [showDelCus, setShowDelCus] = useState(false);
  const [delCusName, setDelCusName] = useState("");
  const [delCusId, setDelCusID] = useState(0);

  //add customer
  const [show, setShow] = useState(false);
  const [cusName, setCusName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  //Handlers
  const handleShowDelete = () => setShowDelCus(true);
  const handleShow = () => setShow(true);

  //close form for new cus after creating or when pressed Cancel button
  const handleClose = () => {
    setCusName("");
    setAddress("");
    setPhone("");
    setShow(false);
  };

  //close form for delete cus after deleting or when pressed Cancel button
  const handleCloseDelete = () => {
    setShowDelCus(false);
  };

  useEffect(() => {
    customers
      .fetchCustomers()
      .then((data) => {
        setCusArray(data.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });

    return () => {
      clearData();
    };
  }, []);

  const addCustomer = async () => {
    await customers.createCustomer({
      name: cusName,
      address: address,
      phone: phone,
    });
    //clear all temporary fields
    setCusName("");
    setAddress("");
    setPhone("");
    setShow(!show);
    setValid(!isValid);
    //reload data
    updateCusArr();
  };

  //save deleting cus data for information page
  const removeCustomer = (event, cus) => {
    event.preventDefault();
    setDelCusName(cus.name);
    setDelCusID(cus.id);
    handleShowDelete();
  };

  //delete cus
  const deleteCustomerFn = async () => {
    await customers.deleteCustomer(delCusId);
    //clear all temporary fields
    setDelCusName("");
    setDelCusID("");
    setShowDelCus(!showDelCus);
    //for data updating
    updateCusArr();
  };

  //check if all fields for new cus are filled in
  const checkValid = () => {
    if (cusName && address && phone !== "") setValid(true);
  };

  function updateCusArr() {
    customers
      .fetchCustomers()
      .then((data) => {
        setCusArray(data.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  }

  const changeData = (event, dataName) => {
    switch (dataName) {
      case "address":
        setAddress(event.target.value);
        break;
      case "name":
        setCusName(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      default:
        console.warn(`Unknown input type: ${dataName}`);
        break;
    }
    checkValid();
  };

  function clearData() {
    setCusName("");
    setAddress("");
    setPhone("");
    setDelCusName("");
    setDelCusID("");
    setValid(false);
    setCusArray([]);
    setShowDelCus(false);
    setShow(false);
  }

  return (
    <React.Fragment>
      {/* For create new customer */}
      <>
        <Button
          type="button"
          variant="btn btn-dark"
          onClick={handleShow}
          style={{ marginTop: "10px", marginLeft: "15%" }}
        >
          Add Customer
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Add new Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={cusName}
                  onChange={(e) => {
                    changeData(e, "name");
                  }}
                  autoFocus
                  required
                  maxLength={30}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={(e) => {
                    changeData(e, "address");
                  }}
                  autoFocus
                  required
                  maxLength={50}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    changeData(e, "phone");
                  }}
                  placeholder="555-555-5555"
                  required
                  maxLength={20}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="btn btn-dark"
              onClick={addCustomer}
              disabled={!isValid}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* Table with customers */}
      <Table
        className="mt-4"
        striped
        bordered
        hover
        size="sm"
        style={{ width: "70%", margin: "auto" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {cusArray.map((cus) => (
            <tr key={cus.id}>
              <td>{cus.id}</td>
              <td>{cus.name}</td>
              <td>{cus.address}</td>
              <td>{cus.phone}</td>
              <td width="7%">
                <Button
                  variant="btn btn-dark"
                  size="sm"
                  onClick={(e) => {
                    removeCustomer(e, cus);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* for delete customer */}
      <Modal show={showDelCus}>
        <Modal.Header>
          <Modal.Title>Delete Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>You delete this customer: {delCusName}</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Customer ID: {delCusId}</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="btn btn-secondary"
            onClick={() => handleCloseDelete()}
          >
            Cancel
          </Button>
          <Button variant="btn btn-dark" onClick={() => deleteCustomerFn()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
});

export default CustomersPage;
