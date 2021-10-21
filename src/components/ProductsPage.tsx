import React, { Fragment, useEffect, useState } from "react";
import { Container, Spinner, Table, Row, Col, Fade } from "react-bootstrap";
import { fetchProducts } from "../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { IProduct } from "../Types/productTypes";
import { Link } from "react-router-dom";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { ICategory } from "../Types/categoryTypes";

export const ProductsPage = () => {
  const productsFromApi = useAppSelector<IProduct[]>(
    (state) => state.products.products
  );
  const categoriesFromApi = useAppSelector<ICategory[]>(
    (state) => state.categories.categories
  );

  console.log(productsFromApi);
  console.log(categoriesFromApi);
  const status = useAppSelector((state) => state.products.status);
  const error = useAppSelector((state) => state.products.error);

  const dispatch = useAppDispatch();

  const products: any[] = [];
  productsFromApi.filter((product) => {
    categoriesFromApi.filter((category) => {
      if (product.category_id === category.category_id) {
        console.log(product.category_id, category.category_id);
        console.log({ ...product, category_name: category.name });
        products.push({ ...product, category_name: category.name });
      }
    });
  });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <>
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
              <Fade in={true} appear={true}>
                <Table
                  striped
                  bordered
                  hover
                  size="sm"
                  style={{
                    textAlign: "center",
                    backgroundColor: "#dee2e6",
                  }}
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Manage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product: any) => {
                      return (
                        <Fragment key={product.id}>
                          <tr style={{ verticalAlign: "middle" }}>
                            <td
                              style={{
                                width: "3%",
                                padding: "6px",
                              }}
                            >
                              {product.id}
                            </td>
                            <td
                              style={{
                                padding: "6px",
                              }}
                            >
                              {product.name}
                            </td>
                            <td
                              style={{
                                padding: "6px",
                              }}
                            >
                              {product.category_name}
                            </td>
                            <td
                              style={{
                                padding: "6px",
                              }}
                            >
                              <Link
                                className="btn btn-primary btn-sm"
                                role="button"
                                to="/edit"
                              >
                                Edit Product
                              </Link>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              </Fade>
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
