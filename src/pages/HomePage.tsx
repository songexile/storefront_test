import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import heroImage from "../assets/images/heroImage.jpg";
import { useProducts } from "../hooks/fetchProducts";
import { Link } from "react-router-dom";
import { Product } from "../components/Product/product.interface";
import ProductCard from "../components/Product/ProductCard";
import { CartContext } from "../context/cart";

function HomePage() {
  const { addToCart } = useContext(CartContext);
  const { products, isLoading, error } = useProducts(3); // Fetch top 3 products

  return (
    <Layout>
      <div className="h-screen w-screen bg-white flex flex-col items-center justify-start">
        <div className="flex items-center w-2/3 lg:w-4/5 h-1/2 rounded-md mt-32 justify-center flex-col">
          <img
            className="w-full max-w-4xl rounded-md border-4"
            src={heroImage}
            alt="Hero"
          />
          <h1 className="text-3xl lg:text-4xl mt-4 text-center">
            Quality Clothes based in Christchurch
          </h1>
        </div>

        <div className="w-full max-w-6xl mt-12 px-4">
          <h2 className="text-2xl font-semibold mb-6 text-center">Best Sellers</h2>

          {isLoading && <p className="text-center">Loading best sellers...</p>}
          {error && <p className="text-red-500 text-center">Error: {error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: Product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
