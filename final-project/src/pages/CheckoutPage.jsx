import Checkout from "../components/checkout/Checkout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CheckoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.navigateCheckout = () => navigate("/order-confirmation");

    return () => {
      delete window.navigateCheckout;
    };
  }, [navigate]);

  return (
    <main className="checkout-page">
      <Checkout />
    </main>
  );
}
