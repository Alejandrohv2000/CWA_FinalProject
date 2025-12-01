import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { loadReviews, saveReviews } from '../services/localStorage';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/RatingStars';


export default function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [localReviews, setLocalReviews] = useState([]);
const { addToCart } = useCart();


useEffect(() => {
fetchProductById(id).then(setProduct).catch(e => console.error(e));
const map = loadReviews();
setLocalReviews(map[id] || []);
}, [id]);


if (!product) return <div>Loading product...</div>;


const apiRating = product.rating ? Number(product.rating) : 0;
const allRatings = [...(product?.ratings || []), ...localReviews.map(r => r.rating)];
// product?.ratings may not exist; use product.rating as single value
const combinedRatings = [...(product.rating ? [product.rating] : []), ...localReviews.map(r => r.rating)];
const avg = combinedRatings.length ? (combinedRatings.reduce((s,n)=>s+Number(n),0)/combinedRatings.length) : apiRating;


const handleSubmitReview = (review) => {
const map = loadReviews();
map[id] = [review, ...(map[id] || [])];
saveReviews(map);
setLocalReviews(map[id]);
};


const price = product.price;
const hasDiscount = product.discountPercentage && product.discountPercentage > 0;
const discountValue = hasDiscount ? price * (product.discountPercentage / 100) : 0;
const discountedPrice = hasDiscount ? price - discountValue : price;


return (
<div className="product-detail">
<div className="gallery">
{product.images && product.images.map((src,i) => <img key={i} src={src} alt={`${product.title} ${i}`} loading="lazy" />)}
</div>
<div className="info">
<h1>{product.title}</h1>
<div className="rating"><RatingStars rating={avg} /> <span>{avg.toFixed(2)}</span></div>
<p className="desc">{product.description}</p>
<div className="price-row">
{hasDiscount ? (
<><span className="orig">${price.toFixed(2)}</span> <span className="discount">${discountedPrice.toFixed(2)}</span></>
) : <span className="price">${price.toFixed(2)}</span>}
</div>
<button onClick={() => addToCart(product, 1)}>Add to Cart</button>
</div>


<section className="reviews">
<h2>Reviews</h2>
<ReviewForm onSubmit={handleSubmitReview} />
<ReviewList reviews={[...(product?.apiReviews || []), ...localReviews]} />
</section>
</div>
);
}