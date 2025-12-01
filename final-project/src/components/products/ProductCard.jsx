import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';


export default function ProductCard({ product, onAddToCart }) {
const navigate = useNavigate();
const { id, title, price, discountPercentage, category, rating, thumbnail } = product;
const hasDiscount = discountPercentage && discountPercentage > 0;
const discountValue = hasDiscount ? (price * (discountPercentage / 100)) : 0;
const discountedPrice = hasDiscount ? (price - discountValue) : price;


return (
<article className="product-card">
<div className="thumb" onClick={() => navigate(`/product/${id}`)}>
<img src={thumbnail} alt={title} loading="lazy" />
</div>
<div className="meta">
<h3 onClick={() => navigate(`/product/${id}`)}>{title}</h3>
<p className="category">{category}</p>
<div className="price-row">
{hasDiscount ? (
<>
<span className="orig">${price.toFixed(2)}</span>
<span className="discount">${discountedPrice.toFixed(2)}</span>
</>
) : <span className="price">${price.toFixed(2)}</span>}
</div>
<div className="rating-row"><RatingStars rating={Number(rating)} /> <span>({Number(rating).toFixed(1)})</span></div>
<button className="btn" onClick={() => onAddToCart(product)}>Add to Cart</button>
</div>
</article>
);
}