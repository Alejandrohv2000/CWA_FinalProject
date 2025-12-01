import React from 'react';


export default function ReviewList({ reviews = [] }) {
if (!reviews.length) return <div>No reviews yet.</div>;
return (
<ul className="review-list">
{reviews.map((r, i) => (
<li key={i} className="review-item">
<div className="review-meta"><strong>{r.name || 'Anonymous'}</strong> <span>{new Date(r.date).toLocaleString()}</span></div>
<div className="review-rating">Rating: {Number(r.rating).toFixed(1)}</div>
<p className="review-text">{r.text}</p>
</li>
))}
</ul>
);
}