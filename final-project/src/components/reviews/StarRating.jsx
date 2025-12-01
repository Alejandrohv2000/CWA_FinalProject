import React from 'react';


export default function RatingStars({ rating = 0, max = 5 }) {
const full = Math.floor(rating);
const half = rating - full >= 0.5;
const empty = max - full - (half ? 1 : 0);
return (
<span aria-label={`Rating ${rating} of ${max}`} className="rating-stars">
{Array.from({ length: full }).map((_,i) => <span key={`f${i}`}>★</span>)}
{half && <span>☆</span>}
{Array.from({ length: empty }).map((_,i) => <span key={`e${i}`}>✩</span>)}
</span>
);
}