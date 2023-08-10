import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

export function CustomersTable() {
  return (
    <>
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
                  value={tempCusName.current}
                  onChange={(e) => {
                    tempCusName.current = e.target.value;
                    changeData(e, "name");
                  }}
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
                  value={tempCusAddress.current}
                  onChange={(e) => {
                    tempCusAddress.current = e.target.value;
                    changeData(e, "address");
                  }}
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
                  value={tempCusPhone.current}
                  onChange={(e) => {
                    tempCusPhone.current = e.target.value;
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
                  onClick={(e) => removeCustomer(e, cus)}
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
    </>
  );
}
