import React, { FC, useEffect } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { ICategory } from "../Types/categoryTypes";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchCategories } from "../features/categories/categoriesSlice";
import TablePage from "./TablePage";

export const CategoriesPage = () => {
  const categoriesFromApi = useAppSelector<ICategory[]>(
    (state) => state.categories.categories
  );

  const status = useAppSelector((state) => state.categories.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <Container className="h-100">
      {status === "loading" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner animation="border" role="status" style={{}}>
            <span
              className="visually-hidden"
              style={{ display: "inline-block" }}
            >
              Loading...
            </span>
          </Spinner>
        </div>
      )}
      <Row className="pt-5 w-100 m-auto">
        <Col>
          {status === "succeeded" && (
            <TablePage data={categoriesFromApi} name="categories" />
          )}
          {status === "failed" && (
            <p
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              Something went wrong :(
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};
