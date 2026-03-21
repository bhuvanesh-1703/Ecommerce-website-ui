import { createContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './HeaderComponent/Contact'
import AboutUs from './HeaderComponent/AboutUS'
import Product from './HeaderComponent/Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './HeaderComponent/signIn'
import SignUp from './HeaderComponent/signUp'
import ProductDetails from './HeaderComponent/ProductDetails'
import UserDetails from './HeaderComponent/OrderConfirm'
import Payment from './HeaderComponent/Payment'
import axios from 'axios'

import AddCart from './HeaderComponent/AddCart'
import UserDashboard from './HeaderComponent/UserDashboard'
import Orders from './UserDashboard/Orders'
import MainLayout from './components/MainLayout';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashbaord';
import AdminUsers from './admin/users';
import AdminCategory from './admin/Category';
import AdminProducts from './admin/products';
import AdminOrder from './admin/Order';
import AdminMessages from './admin/Messages';

export const authContext = createContext();

function App() {
  const [userData, setUserData] = useState(() => localStorage.getItem('userId'));
  const [cart, setCart] = useState([]);

  // const getCart = async () => {
  //   try {
  //     const userId = localStorage.getItem('userId');
  //     if (!userId) {
  //       setCart([]);
  //       return;
  //     }
  //     const response = await axios.get(`http://localhost:5100/cart?userId=${userId}`);
  //     setCart(response.data.data);
  //     console.log(response.data.data);

  //   } catch (error) {
  //     console.log('Failed to fetch cart', error);
  //   }
  // };

  const getCart = async () => {
    try {
      const storedUser = localStorage.getItem('userId');
      const userId = JSON.parse(storedUser)._id || JSON.parse(storedUser);

      const response = await axios.get(`http://localhost:5100/cart?userId=${userId}`);

      const validItems = response.data.data.filter(
        item => item.productId !== null
      );

      setCart(validItems);
      // console.log(validItems);
    } catch (error) {
      console.log('Failed to fetch cart', error);
    }
  };


  useEffect(() => {
    getCart();
  }, [userData]);

  return (
    <>
      <BrowserRouter>
        <authContext.Provider value={{ userData, setUserData, cart, setCart }}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<Home />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/aboutus' element={<AboutUs />} />
              <Route path='/cart' element={<AddCart />} />
              <Route path='/products' element={<Product />} />
              <Route path='/product/:product_id' element={<ProductDetails />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/payment' element={<Payment />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/userdetails' element={<UserDetails />} />
              <Route path='/userdashboard' element={<UserDashboard />} />
              <Route path='/orders' element={<Orders />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="category" element={<AdminCategory />} />
              <Route path="product" element={<AdminProducts />} />
              <Route path="order" element={<AdminOrder />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="product/:id" element={<AdminProducts />} />
            </Route>
          </Routes>
        </authContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App


