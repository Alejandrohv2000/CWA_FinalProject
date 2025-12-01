import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';


export default function Header() {
const { totalItems } = useCart();
return (
<header className="site-header">
<div className="brand"><Link to="/">My E-Commerce</Link></div>
<nav>
<Link to="/">Home</Link>
<Link to="/cart">Cart ({totalItems})</Link>
</nav>
</header>
);
}