import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import heroImage from "../assets/images/heroImage.jpg";
import { useProducts } from "../hooks/fetchProducts";
import { Product } from "../components/Product/product.interface";
import ProductCard from "../components/Product/ProductCard";
import { CartContext } from "../context/cart";
import ErrorState from "../components/UI/ErrorState";
import LoadingState from "../components/UI/LoadingState";
import { Link } from "react-router-dom";
import RecommendedProducts from "../components/Product/RecommendedProducts";

function HomePage() {
  const { addToCart } = useContext(CartContext);
  const { products, isLoading, error } = useProducts(3); // Fetch first three products

  const heroContent = (
    <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="relative text-center px-6">
        <h1 className="text-4xl lg:text-5xl font-bold  drop-shadow-lg">
          Quality Clothes Based in Christchurch
        </h1>
        <p className="mt-4 text-lg  opacity-90">
          Discover our best collection and redefine your style.
        </p>
      </div>
    </div>
  );

  const productList = (
    <div className="w-full max-w-6xl  mt-16 px-6 rounded-md">
    
      {/* Loading state while we fetch 3 products */}
      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <RecommendedProducts products={products} title="Best Sellers" onAddToCart={addToCart} />

      <div className="text-center mt-10">
        <Link
          to="/products"
          className="px-8 py-3 bg-primary-content transition"
        >
          View All Products
        </Link>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {heroContent}
       
        {productList}
      </div>
    </Layout>
  );
}

export default HomePage;
