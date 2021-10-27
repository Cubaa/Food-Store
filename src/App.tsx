import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { PageNavbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  {ProductsPage}  from "./components/Pages/ProductsPage";
import { MainPage } from "./components/Pages/MainPage";
import { AddProductPage } from "./components/Pages/AddProductPage";
import { CategoriesPage } from "./components/Pages/CategoriesPage";
import { AddCategoryPage } from "./components/Pages/AddCategoryPage";
import { EditCategoryPage } from "./components/Pages/EditCategoryPage";
import { EditProductPage } from "./components/Pages/EditProductPage";

function App() {
  return (
    <Router>
      <Container
        fluid
        style={{ backgroundColor: "#e9ecef", minHeight: "100vh" }}
      >
        <PageNavbar />
        <Switch>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route path="/products">
            <ProductsPage />
          </Route>
          <Route path="/categories">
            <CategoriesPage />
          </Route>
          <Route path="/addProduct">
            <AddProductPage />
          </Route>
          <Route path="/addCategory">
            <AddCategoryPage />
          </Route>
          <Route path="/editCategory/:id">
            <EditCategoryPage />
          </Route>
          <Route path="/editProduct/:id">
            <EditProductPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
