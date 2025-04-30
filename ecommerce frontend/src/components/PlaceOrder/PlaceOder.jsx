import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartItems, getTotalCartAmount, setCartItems } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false); // ✅ New state to track success

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all the fields.");
      return;
    }

    const orderData = {
      user: formData,
      cartItems,
      totalAmount: getTotalCartAmount(),
    };

    const res = await fetch("https://shopper-xmp2.onrender.com/placeorder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
      setOrderPlaced(true); // ✅ trigger success UI
      setCartItems({});
    } else {
      alert("Order failed: " + data.message);
    }
  };

  return (
    <div className="order-container">
      {orderPlaced ? (
        <div className="success-message">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Thank you for shopping with us.</p>
          <button className="go-home-btn" onClick={() => window.location.href = '/'}>
           🛍️ Continue Shopping
          </button>

        </div>
      ) : (
        <div className="order-form">
          <h2>Place Your Order</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
            <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <button type="submit">Submit Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
