const BASE = 'https://dummyjson.com';

export async function fetchAllProducts(limit = 0, skip = 0) {
  
  const url = `${BASE}/products?limit=${limit}&skip=${skip}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  const data = await res.json();
  return data; 
}

export async function fetchProductById(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  return res.json(); 
}
