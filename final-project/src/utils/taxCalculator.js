export function calculateTaxes(subtotal, provinceCode) {
  const GST = 0.05;
  const QST = 0.09975;

  const gst = subtotal * GST;
  const qst = provinceCode === 'QC' ? subtotal * QST : 0;
  const total = subtotal + gst + qst;

  return { gst, qst, total };
}
