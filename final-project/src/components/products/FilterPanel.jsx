import React, { useEffect, useState } from 'react';
<option value="">All</option>
import { fetchCategories } from '../services/api';


export default function FilterPanel({ filters, setFilters }) {
const [categories, setCategories] = useState([]);


useEffect(() => {
fetchCategories().then(setCategories).catch(() => setCategories([]));
}, []);


return (
<aside className="filter-panel">
<label>
Category
<select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}>
<option value="">All</option>
<option value="">All</option>
{categories.map(c => <option key={c} value={c}>{c}</option>)}
</select>
</label>


<label>
Price min
<input type="number" value={filters.minPrice || ''} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : '' }))} />
</label>
<label>
Price max
<input type="number" value={filters.maxPrice || ''} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : '' }))} />
</label>


<label>
Sort
<select value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
<option value="">Default</option>
<option value="price-asc">Price: Low → High</option>
<option value="price-desc">Price: High → Low</option>
<option value="rating-desc">Highest rating</option>
</select>
</label>


</aside>
);
}