import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProductsList } from "./components/ProductsList";
import { ProductCard } from "./components/ProductCard";
import { Cart } from "./components/Cart";

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="product-card/:id" element={<ProductCard />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </header>
    </div>
  );
}
