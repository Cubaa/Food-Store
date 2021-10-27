import React, { FC, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { ICategoryTypes } from "../../Types/categoryTypes";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchCategories, resetCategoriesErrors } from "../../features/categories/categoriesSlice";
import { TablePage } from "../Table";
import { resetProductsErrors } from "../../features/products/productsSlice";

export const CategoriesPage:FC = () => {
  const categoriesFromApi = useAppSelector<ICategoryTypes[]>(
    state => state.categories.categories
    );

  const status = useAppSelector<string | undefined>((state) => state.categories.status);
  const loading = useAppSelector<string | undefined>((state) => state.categories.loading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(resetProductsErrors())
    dispatch(resetCategoriesErrors())
  }, [dispatch]);

  return (
    <Container className="h-100">
      {loading === "loading" && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          }}>
          <Spinner animation="border" role="status" style={{}}>
            <span className="visually-hidden" style={{ display: "inline-block" }}>Loading...</span>
          </Spinner>
        </div>
      )}
      <Row className="pt-5 w-100 m-auto">
        <Col>
          {status === "succeeded" && (<TablePage categories={categoriesFromApi} name="categories" />)}
          {loading === "Failed to fetch" && (
            <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold", fontSize: "20px"}}>Something went wrong :(</p>)}
        </Col>
      </Row>
    </Container>
   );
};
