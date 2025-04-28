import React, {createContext, useEffect, useState} from "react";
//import all_product from '../components/Asset/all_product';

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
        let cart = {};
        for(let index = 0; index < 300+1; index++) {
            cart[index] =0;
        }
        return cart;
    }

const ShopContextProvider = (props) => {

    const[all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems] =useState(getDefaultCart());
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const productRes = await fetch('http://localhost:4000/allproducts');
            const productData = await productRes.json();
            setAll_Product(productData);
      
            if (localStorage.getItem('auth-token')) {
              const cartRes = await fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'auth-token': localStorage.getItem('auth-token'),
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({}), 
              });
              const cartData = await cartRes.json();
              setCartItems(cartData);
            }
          } catch (err) {
            console.error("Error fetching data:", err);
          }
        };
      
        fetchData();
      }, []);
      

      const addToCart = (itemId) => {
        if (!localStorage.getItem('auth-token')) {
          window.location.href = '/login?message=Please%20login%20first';
          return;
        }
      
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      
        fetch('http://localhost:4000/addtocart', {
          method: 'POST',
          headers: {
            Accept: 'application/form-data',
            'auth-token': `${localStorage.getItem('auth-token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: itemId }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
      
        
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                 let itemInfo = all_product.find((product)=>product.id===Number(item))
                 totalAmount += itemInfo.new_price *cartItems[item]; 
                     
            }  
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if (cartItems[item]>0)
            {
                 totalItem += cartItems[item];        
            }  
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,setCartItems};

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;