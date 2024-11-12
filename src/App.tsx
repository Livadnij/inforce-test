import { Container } from "@mui/material";
import React from "react";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductCreateModal from "./components/ProductCreateModal";
import ProductDeleteDialog from "./components/ProductDeleteDialog";

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
        </Routes>
      </Router>
      <ProductCreateModal />
      <ProductDeleteDialog />
    </Container>
  );
}

export default App;
