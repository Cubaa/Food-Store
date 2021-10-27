import React, { FC, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { resetCategoriesErrors } from "../../features/categories/categoriesSlice";
import { resetProductsErrors } from "../../features/products/productsSlice";
import { useAppDispatch } from "../../hooks";

export const MainPage:FC = () => {

  const dispatch = useAppDispatch()

  useEffect(()=>{
    dispatch(resetProductsErrors())
    dispatch(resetCategoriesErrors())
  }, [dispatch])

  return (
    <Container className="pt-5 d-flex flex-column align-items-center">
      <Row className="w-50">
        <Col className="d-flex justify-content-center align-items-center pt-5">
          <Link className="btn btn-primary btn-lg" role="button" to="/addProduct">Add Product</Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center pt-5">
          <Link className="btn btn-primary btn-lg" role="button" to="/addCategory">Add Category</Link>
        </Col>
      </Row>
    </Container>
  );
};
