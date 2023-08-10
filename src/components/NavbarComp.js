import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark">
      <Container style={{ display: "flex", justifyContent: "flex-start" }}>
        <a
          style={{ marginLeft: "8%", fontSize: "20px", color: "white" }}
          onClick={() => navigate("/invoices")}
        >
          InvoiceApp
        </a>
        <a
          style={{ color: "white", marginLeft: "4%", cursor: "pointer" }}
          onClick={() => navigate("/invoices")}
        >
          Invoices
        </a>
        <a
          style={{ marginLeft: "2%", color: "white", cursor: "pointer" }}
          onClick={() => navigate("/products")}
        >
          Products
        </a>
        <a
          style={{ marginLeft: "2%", color: "white", cursor: "pointer" }}
          onClick={() => navigate("/customers")}
        >
          Customers
        </a>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
