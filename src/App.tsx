import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { PageNavbar } from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProductsPage } from "./components/ProductsPage";
import { MainPage } from "./components/MainPage";
import { AddProduct } from "./components/AddProduct";

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
          <Route path="/addProduct">
            <AddProduct />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
