import { useCart } from '../../context/CartContext';

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();

  const handleQtyChange = e => {
    const value = Number(e.target.value);
    if (Number.isNaN(value)) return;
    updateQty(item.id, value);
  };

  const lineTotal = item.price * item.qty;

  return (
    <div className="d-flex align-items-center border p-3 mb-3">
      <img
        src={item.thumbnail}
        alt={item.title}
        style={{ width: 80, height: 80, objectFit: 'cover' }}
      />

      <div className="ms-3 flex-grow-1">
        <h5 className="mb-1">{item.title}</h5>
        <p>${item.price.toFixed(2)}</p>
      </div>

      <input
        type="number"
        min="1"
        value={item.qty}
        onChange={handleQtyChange}
        className="form-control"
        style={{ width: '80px' }}
      />

      <div className="ms-3">
        ${lineTotal.toFixed(2)}
      </div>

      <button
        className="btn btn-danger ms-3"
        onClick={() => removeFromCart(item.id)}
      >
        Remove
      </button>
    </div>
  );
}
