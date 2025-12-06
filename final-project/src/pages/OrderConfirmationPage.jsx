import { Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
  const raw = localStorage.getItem('ecommerce_last_order');
  const order = raw ? JSON.parse(raw) : null;

  if (!order) {
    return (
      <div className="container mt-4">
        <h2>No recent order found.</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Thank You For Your Purchase!</h2>

      <h4 className="mt-4">Items</h4>
      {order.items.map(item => (
        <div key={item.id} className="border p-2 mb-2">
          {item.title} (x{item.qty}) — $
          {(item.price * item.qty).toFixed(2)}
        </div>
      ))}

      <h4 className="mt-4">Totals</h4>
      <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
      <p>GST: ${order.taxes.gst.toFixed(2)}</p>
      <p>QST: ${order.taxes.qst.toFixed(2)}</p>
      <h3>Total: ${order.total.toFixed(2)}</h3>

      <h4 className="mt-4">Shipping To</h4>
      <p>{order.shipping.name}</p>
      <p>{order.shipping.address}</p>
      <p>
        {order.shipping.city}, {order.shipping.province}
      </p>
      <p>{order.shipping.postal}</p>

      <h4 className="mt-4">Payment Method</h4>
      <p>{order.paymentMethod}</p>

      <Link to="/" className="btn btn-primary mt-4">
        Back to Home
      </Link>
    </div>
  );
}
