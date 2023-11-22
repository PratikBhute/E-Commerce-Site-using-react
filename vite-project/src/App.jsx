import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Cart from './pages/cart/Cart';
import Home from './pages/home/Home';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import AllProducts from './pages/allproducts/AllProducts';
import SignUp from './pages/registration/SignUp';
import Login from './pages/registration/Login';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/updateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Order from './pages/order/Order';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/order" element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>} />


          <Route path="/cart" element={<Cart />} />
          <Route path="/allproducts" element={<AllProducts />} />

          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <Dashboard />
            </ProtectedRoutesForAdmin>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />

          <Route path="/addproduct" element={
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>} />

          <Route path="/updateproduct" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct />
            </ProtectedRoutesForAdmin>} />


          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App

export const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem('user');
  //console.log("user : "+ user)
  if (user) {
    return children;
  } else {
    return <Navigate to='/login' />
  }
}



export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user'))
  // console.log(admin.user.email)
  if (admin.user.email === 'pratikvbhute@gmail.com') {
    return children
  }
  else {
    return <Navigate to='/login' />
  }
}