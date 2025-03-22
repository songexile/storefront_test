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


function HomePage() {
  const { addToCart } = useContext(CartContext);
  const { products, isLoading, error } = useProducts(3); // Fetch top 3 products

  const heroContent = (
    <div className="relative w-full h-96 lg:h-[500px] flex items-center justify-center">
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="relative text-center px-6">
        <h1 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
          Quality Clothes Based in Christchurch
        </h1>
        <p className="mt-4 text-lg text-white opacity-90">
          Discover our best collection and redefine your style.
        </p>
      </div>
    </div>
  );

  const productList = (
    <div className="w-full max-w-6xl mt-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Best Sellers
      </h2>

      {isLoading && <LoadingState />}
      {error && <ErrorState message={error} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products?.map((product: Product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Link to="/products" className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition">
          View All Products
        </Link>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-white flex flex-col items-center">
        {heroContent}
        {productList}
      </div>
    </Layout>
  );
}

export default HomePage;
