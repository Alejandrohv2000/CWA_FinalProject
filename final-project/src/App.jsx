import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

import Header from './components/layout/Header';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />

        <Routes>
          {/* Product browsing routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:id"
            element={<ProductDetailPage />}
          />

          {/* Cart & checkout routes (your part) */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
