import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Asset/remove_icon.png'
import { useNavigate } from 'react-router-dom';


const CartItems = () => {
    const navigate = useNavigate();
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);

    const totalAmount = getTotalCartAmount();

  const isCartEmpty = Object.values(cartItems).every((quantity) => quantity === 0);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
        if(cartItems[e.id]>0)
        {
          return  <div>
                    <div className="cartitems-format cartitems-format-main">
                        <img src={e.image} alt="" className='carticon-product-icon' />
                        <p>{e.name}</p>
                        <p>{e.new_price}Rs </p>
                        <buttton className="cartitems-quantity">{cartItems[e.id]}</buttton>
                        < p>{e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                 </div>
        }
        return null;
      })}
      {!isCartEmpty && (
        <div className='cartitems-down'>
          <div className='cartitems-total'>
            <h1>Cart Totals</h1>
            <div>
              <div className='cartitems-total-item'>
                <p>Subtotal</p>
                <p>${totalAmount}</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className='cartitems-total-item'>
                <h3>Total</h3>
                <h3>${totalAmount}</h3>
              </div>
            </div>
            <button onClick={() => navigate('/placeorder')}>PROCEED TO PLACEORDER</button>
          </div>
        </div>
      )}

      {isCartEmpty && (
        <div style={{ textAlign: 'center', marginTop: '30px', fontSize: '18px' }}>
          🛒 Your cart is empty.
        </div>
      )}
    </div>
  )
}

export default CartItems
