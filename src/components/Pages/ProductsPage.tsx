import React, {useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "react-bootstrap";
import { fetchProducts, resetProductsErrors } from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ICategoryTypes } from "../../Types/categoryTypes";
import { TablePage } from "../Table";
import { fetchCategories, resetCategoriesErrors } from "../../features/categories/categoriesSlice";
import { IProductTypes } from "../../Types/productTypes";
import { getProductsHandler } from "../../utils/getProductsHandler";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<IProductTypes[]>([])
  const productsFromApi = useAppSelector<IProductTypes[]>(
    (state) => state.products.products
  );
  const status = useAppSelector<string | undefined>((state) => state.products.status);
  const loading = useAppSelector<string | undefined>((state) => state.products.loading);

  const categoriesFromApi = useAppSelector<ICategoryTypes[]>(
    (state) => state.categories.categories
  );
  
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(resetProductsErrors())
    dispatch(resetCategoriesErrors())  
  }, [dispatch]);
  
  useEffect(() => {
    const reworkedProducts:IProductTypes[] = getProductsHandler(productsFromApi, categoriesFromApi) 
    setProducts(reworkedProducts)
  }, [productsFromApi, categoriesFromApi])

  return (
      <Container className="h-100">
        {loading === "loading" && ( <div style={{ position: "absolute", top: "50%", left: "50%",transform: "translate(-50%, -50%)"}}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden" style={{ display: "inline-block" }}>Loading...</span>
            </Spinner>
          </div>
        )}
        <Row className="pt-5 w-100 m-auto">
          <Col>
            {status === "succeeded" && (<TablePage products={products} name="products" />)}
            {loading === "Failed to fetch" && ( <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontWeight: "bold", fontSize: "20px"}}>
                Something went wrong :(
              </p>
            )}
          </Col>   
        </Row>
      </Container>
  );
};
