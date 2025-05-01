Live link for ecommerce:
[open](https://ecommerce-mu-wheat.vercel.app)

Live link for Admin panel:
[open](https://ecommerce-uan1.vercel.app)


Features:

Frontend (React):

Product Browsing – View products by category (Men, Women, Kids)

Product Details Page – Quick overview with pricing, image, etc.

Responsive UI – Fully responsive for mobile, tablet, and desktop

Add to Cart – Easily add items to the cart (protected by login)

Cart Management – Increment, decrement, or remove items

Order Form – Place orders with user details (name, address, phone)

Login/Signup – JWT-authenticated login & registration flow

Previous Cart Sync – Automatically restores cart after login

Success Messages – User-friendly messages after key actions

Protected Routes – Redirect unauthenticated users to login



 State Management:
 
Redux Toolkit – Centralized cart state management

Persisted Cart – Saved cart per user in the backend



 Backend (Express + MongoDB):
 
RESTful API – Modular endpoints for auth, products, cart, and orders

JWT Authentication – Secure token-based auth for all protected routes

MongoDB Atlas – Cloud-hosted NoSQL database for all app data

Cart Storage per User – Users can keep carts across sessions

Order History – Order storage with timestamps and user details

CORS Configured – Supports deployment with separate frontend domain


 Hosting:
 
Frontend on Vercel – Fast static hosting with instant deployment

Backend on Render – Always-on Express API with auto-deploy from GitHub


