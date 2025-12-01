import React, { useState } from 'react';


export default function ReviewForm({ onSubmit }) {
const [name, setName] = useState('');
const [rating, setRating] = useState(5);
const [text, setText] = useState('');


const handle = (e) => {
e.preventDefault();
if (!text.trim()) return alert('Please write a review');
onSubmit({ name: name || 'Anonymous', rating: Number(rating), text, date: new Date().toISOString() });
setName(''); setRating(5); setText('');
};


return (
<form className="review-form" onSubmit={handle}>
<input placeholder="Your name (optional)" value={name} onChange={e => setName(e.target.value)} />
<label>Rating
<select value={rating} onChange={e => setRating(e.target.value)}>
{[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
</select>
</label>
<textarea placeholder="Write your review" value={text} onChange={e => setText(e.target.value)} />
<button type="submit">Submit Review</button>
</form>
);
}