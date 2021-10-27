import React, { FC } from "react";
import { Badge, Container, Navbar, Nav} from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";

export const PageNavbar: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" href="/">
          <img src="/images/fork.png" alt="logo" width="30" height="30" className="d-inline-blockalign-top" style={{ marginRight: "10px" }} />FOOD
          <Badge bg="light" text="dark" className="company-name" style={{ fontSize: "20px", paddingLeft: "0", fontWeight: "normal" }}>Store.</Badge>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products" href="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/categories" href="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
