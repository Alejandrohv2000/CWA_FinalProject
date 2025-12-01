export const CART_KEY = 'ecommerce_cart';
export const REVIEWS_KEY = 'ecommerce_reviews';


export const loadCart = () => {
try {
const raw = localStorage.getItem(CART_KEY);
return raw ? JSON.parse(raw) : { items: [] };
} catch (e) {
console.error('loadCart error', e);
return { items: [] };
}
};


export const saveCart = (cart) => {
try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { console.error(e); }
};


export const loadReviews = () => {
try {
const raw = localStorage.getItem(REVIEWS_KEY);
return raw ? JSON.parse(raw) : {};
} catch (e) {
console.error('loadReviews error', e);
return {};
}
};