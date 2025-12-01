import React from 'react';


export default function SearchBar({ value, onChange }) {
return (
<input
aria-label="Search products"
placeholder="Search products..."
value={value}
onChange={e => onChange(e.target.value)}
className="search-input"
/>
);
}