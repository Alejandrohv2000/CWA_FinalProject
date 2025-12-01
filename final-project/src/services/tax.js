export function calculateTaxes(subtotal, province) {
const gst = +(subtotal * 0.05).toFixed(2);
const qst = province && province.toLowerCase().includes('quebec') ? +(subtotal * 0.09975).toFixed(2) : 0;
const total = +(subtotal + gst + qst).toFixed(2);
return { gst, qst, total };
}