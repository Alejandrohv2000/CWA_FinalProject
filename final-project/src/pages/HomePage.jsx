import React, { useEffect, useMemo, useState } from 'react';
import { fetchAllProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { useCart } from '../context/CartContext';


export default function Home() {
const [all, setAll] = useState([]);
const [loading, setLoading] = useState(true);
const [query, setQuery] = useState('');
const [filters, setFilters] = useState({ category: '', minPrice: '', maxPrice: '', sort: '' });
const { addToCart } = useCart();


useEffect(() => {
fetchAllProducts().then(d => { setAll(d.products || []); setLoading(false); }).catch(e => { console.error(e); setLoading(false); });
}, []);


const filtered = useMemo(() => {
let arr = [...all];
if (query) arr = arr.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
if (filters.category) arr = arr.filter(p => p.category === filters.category);
if (filters.minPrice !== '') arr = arr.filter(p => p.price >= Number(filters.minPrice));
if (filters.maxPrice !== '') arr = arr.filter(p => p.price <= Number(filters.maxPrice));
if (filters.sort === 'price-asc') arr.sort((a,b) => a.price - b.price);
if (filters.sort === 'price-desc') arr.sort((a,b) => b.price - a.price);
if (filters.sort === 'rating-desc') arr.sort((a,b) => b.rating - a.rating);
return arr;
}, [all, query, filters]);


if (loading) return <div>Loading products...</div>;


return (
<div className="page home-page">
<div className="controls">
<SearchBar value={query} onChange={setQuery} />
</div>
<div className="layout">
<FilterPanel filters={filters} setFilters={setFilters} />
<main className="product-grid">
{filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
</main>
</div>
</div>
);
}