import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link to="/cart" className="cart-icon">
      🛒
      <span className="cart-count">{totalItems}</span>
    </Link>
  );
}
