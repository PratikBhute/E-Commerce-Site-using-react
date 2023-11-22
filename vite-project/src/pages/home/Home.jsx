import React, { useContext } from "react";
import Layout from "../../compoents/layout/Layout";
import HeroSection from "../../compoents/heroSection/HeroSection";
import Filter from "../../compoents/filter/Filter";
import ProductCard from "../../compoents/productcard/ProductCard";
import Track from "../../compoents/track/Track";
import Testimonial from "../../compoents/testimonial/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cardSlice";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <div className="flex justify-center mt-1 mb-5">
        <Link to={"/allproducts"}>
        <button className="bg-gray-300 px-5 py-2 rounded-xl">See More</button>
        </Link>
      </div>
      <Track />
      <Testimonial />
    </Layout>
  );
}

export default Home;
