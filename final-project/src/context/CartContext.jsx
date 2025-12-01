import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadCart, saveCart } from '../services/localStorage';


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export function CartProvider({ children }) {
const [cart, setCart] = useState(() => loadCart());


useEffect(() => { saveCart(cart); }, [cart]);


const addToCart = (product, qty = 1) => {
setCart(prev => {
const items = [...(prev.items || [])];
const idx = items.findIndex(i => i.id === product.id);
if (idx > -1) {
items[idx].qty += qty;
} else {
items.push({ id: product.id, title: product.title, price: product.price, qty, thumbnail: product.thumbnail, discountPercentage: product.discountPercentage });
}
return { ...prev, items };
});
};


const removeFromCart = (id) => setCart(prev => ({ ...prev, items: prev.items.filter(i => i.id !== id) }));
const updateQty = (id, qty) => setCart(prev => ({ ...prev, items: prev.items.map(i => i.id === id ? { ...i, qty } : i) }));


const totalItems = cart.items.reduce((s, it) => s + it.qty, 0);


return (
<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, totalItems }}>
{children}
</CartContext.Provider>
);
}