import { useState } from "react";
import "./App.css";
import Navbar, { CartCard, CartCheckout } from "./components/navbar/navbar";
import Services from "./components/services/services";
import { CartProvider } from "./components/cart/cartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <CartProvider>
      <div className="container">
        <Navbar />
        <Services />
        <CartCard cartOpen={cartOpen} setCartOpen={setCartOpen} />
        <CartCheckout cartOpen={cartOpen} setCartOpen={setCartOpen} />
      </div>
    </CartProvider>
  );
}

export default App;
