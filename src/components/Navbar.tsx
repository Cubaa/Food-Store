import React, { FC } from "react";
import { Badge, Container, Navbar, Nav } from "react-bootstrap";
import "../index.css";
import { Link } from "react-router-dom";

export const PageNavbar: FC = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" href="/">
          <img
            src="/images/fork.png"
            alt="logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
            style={{ marginRight: "10px" }}
          />
          FOOD
          <Badge
            bg="light"
            text="dark"
            className="company-name"
            style={{
              fontSize: "20px",
              paddingLeft: "0",
              fontWeight: "normal",
            }}
          >
            Store.
          </Badge>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} className="ml-25" to="/products" href="/products">
            Products
          </Nav.Link>
          <Nav.Link
            as={Link}
            className="ml-25"
            to="/categories"
            href="/categories"
          >
            Categories
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
