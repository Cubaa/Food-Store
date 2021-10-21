import React, { useEffect } from "react";
import { Container, Row, Col, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ICategory } from "../Types/categoryTypes";

export const MainPage = () => {
  return (
    <Container className="pt-5">
      <Carousel>
        <Carousel.Item style={{ height: "450px" }}>
          <img
            className="d-block w-100 h-25 rounded"
            src="/images/edgar-castrejon-1SPu0KT-Ejg-unsplash.jpg"
            alt="First slide"
            style={{ objectFit: "cover", minHeight: "450px" }}
          />
          <Carousel.Caption
            className="rounded"
            style={{ backgroundColor: "#ff4500", color: "#fff" }}
          >
            <h5>U nas kupisz najtaniej</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "450px" }}>
          <img
            className="d-block w-100 h-25 rounded"
            src="/images/emiliano-vittoriosi-OFismyezPnY-unsplash.jpg"
            alt="Second slide"
            style={{ objectFit: "cover", minHeight: "450px" }}
          />

          <Carousel.Caption
            className="rounded"
            style={{ backgroundColor: "#ff4500", color: "#fff" }}
          >
            <h5>U nas kupisz wszystko</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: "450px" }}>
          <img
            className="d-block w-100 h-25"
            src="/images/joseph-gonzalez-fdlZBWIP0aM-unsplash (2).jpg"
            alt="Third slide"
            style={{ objectFit: "cover", minHeight: "450px" }}
          />

          <Carousel.Caption
            className="rounded"
            style={{ backgroundColor: "#ff4500", color: "#fff" }}
          >
            <h5>Szybko do nas wrócisz</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row>
        <Col className="d-flex justify-content-center align-items-center pt-5">
          <Link
            className="btn btn-primary btn-lg"
            role="button"
            to="/addProduct"
          >
            Add Product
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
