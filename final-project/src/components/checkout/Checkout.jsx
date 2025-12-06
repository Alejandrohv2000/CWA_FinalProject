import { useCart } from "../../context/CartContext";
import { calculateTaxes } from "../../utils/taxCalculator";
import { isRequired, isPostalCode } from "../../utils/validators";
import ErrorMessage from "../common/ErrorMessage";
import { useState } from "react";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();

  const [province, setProvince] = useState("QC");
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postal: "",
    payment: "credit"
  });

  const [error, setError] = useState("");

  if (!items.length) {
    return <h2>Your cart is empty.</h2>;
  }

  const taxes = calculateTaxes(subtotal, province);

  const handleChange = field => e => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError("");

    if (!isRequired(form.name)) return setError("Name is required.");
    if (!isRequired(form.address)) return setError("Address is required.");
    if (!isRequired(form.city)) return setError("City is required.");
    if (!isPostalCode(form.postal)) return setError("Invalid postal code.");

    const order = {
      items,
      subtotal,
      taxes,
      total: taxes.total,
      shipping: {
        name: form.name,
        address: form.address,
        city: form.city,
        province,
        postal: form.postal
      },
      paymentMethod: form.payment,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem("ecommerce_last_order", JSON.stringify(order));
    clearCart();

    if (typeof window.navigateCheckout === "function") {
      window.navigateCheckout();
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <ErrorMessage>{error}</ErrorMessage>

      <form onSubmit={handleSubmit}>
        <label>Name *</label>
        <input
          type="text"
          className="form-control"
          value={form.name}
          onChange={handleChange("name")}
        />

        <label className="mt-2">Address *</label>
        <input
          type="text"
          className="form-control"
          value={form.address}
          onChange={handleChange("address")}
        />

        <label className="mt-2">City *</label>
        <input
          type="text"
          className="form-control"
          value={form.city}
          onChange={handleChange("city")}
        />

        <label className="mt-2">Province *</label>
        <select
          className="form-control"
          value={province}
          onChange={e => setProvince(e.target.value)}
        >
          <option value="QC">Quebec</option>
          <option value="ON">Ontario</option>
          <option value="BC">British Columbia</option>
          <option value="AB">Alberta</option>
        </select>

        <label className="mt-2">Postal Code *</label>
        <input
          type="text"
          className="form-control"
          value={form.postal}
          onChange={handleChange("postal")}
        />

        <label className="mt-2">Payment Method</label>
        <select
          className="form-control"
          value={form.payment}
          onChange={handleChange("payment")}
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>GST: ${taxes.gst.toFixed(2)}</p>
          <p>QST: ${taxes.qst.toFixed(2)}</p>
          <h2>Total: ${taxes.total.toFixed(2)}</h2>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Place order
        </button>
      </form>
    </div>
  );
}
