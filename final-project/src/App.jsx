import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';


export default function App() {
return (
<BrowserRouter>
<CartProvider>
<Header />
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/product/:id" element={<ProductDetail/>} />
{/* Cart, Checkout, OrderConfirmation - teammate B */}
</Routes>
</CartProvider>
</BrowserRouter>
);
}