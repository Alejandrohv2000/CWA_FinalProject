import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import '../../styles/components/Cart.css';

export default function Cart() {
  const { cart, subtotal } = useCart();
  const items = cart.items || [];

  if (items.length === 0) {
    return (
      <div className="container mt-4">
        <h2>Your cart is empty.</h2>
        <Link to="/" className="btn btn-primary mt-3">
          Go Back Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}

      <h3 className="mt-4">Subtotal: ${subtotal.toFixed(2)}</h3>

      <Link to="/checkout" className="btn btn-success mt-3">
        Proceed to Checkout
      </Link>
    </div>
  );
}
