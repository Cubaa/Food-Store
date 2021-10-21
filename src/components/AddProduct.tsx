import React from "react";
import { Container, Form, Button } from "react-bootstrap";

export const AddProduct = () => {
  return (
    <Container>
      <div
        className="d-flex justify-content-center align-items-center mt-5"
        style={{ width: "100%", height: "100%" }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Product name</Form.Label>
            <Form.Control type="text" placeholder="Enter product name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Product Category</Form.Label>
            <Form.Control type="text" placeholder="Enter product category" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </div>
    </Container>
  );
};
