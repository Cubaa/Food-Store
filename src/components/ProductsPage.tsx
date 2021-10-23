import React, { Fragment, useEffect, useState } from "react";
import { Container, Spinner, Table, Row, Col, Fade } from "react-bootstrap";
import { fetchProducts } from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import { ICategory } from "../Types/categoryTypes";
import TablePage from "./TablePage";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { IFetchDataproductTypes } from "../Types/fetchDataProductTypes";

export const ProductsPage = () => {
  console.log("RENDERUJE SIE - PRODUCT PAGE");

  const productsFromApi = useAppSelector<IFetchDataproductTypes[]>(
    (state) => state.products.products
  );
  const status = useAppSelector<string>((state) => state.products.status);

  const categoriesFromApi = useAppSelector<ICategory[]>(
    (state) => state.categories.categories
  );

  console.log(productsFromApi);
  console.log(categoriesFromApi);
  //   const status = useAppSelector((state) => state.products.status);
  //   const error = useAppSelector((state) => state.products.error);
  console.log("product");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const products: IFetchDataproductTypes[] = [];
  productsFromApi.filter((product) => {
    if (categoriesFromApi.length > 0) {
      categoriesFromApi.filter((category) => {
        if (product.category_id === category.category_id)
          products.push({ ...product, category_name: category.name });
      });
    } else {
      products.push({ ...product, category_name: "brak" });
    }
  });

  console.log(products);

  return (
    <>
      <Container className="h-100">
        {status === "loading" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%",
            }}
          >
            <Spinner animation="border" role="status">
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
              <TablePage products={products} name="products" />
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
    </>
  );
};
