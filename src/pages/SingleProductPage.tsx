import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart";
import { useProduct, useProducts } from "../hooks/fetchProducts";
import ProductDetailCard from "../components/Product/ProductDetailCard";
import ProductCard from "../components/Product/ProductCard";
import { Product } from "../components/Product/product.interface";
import LoadingState from "../components/UI/LoadingState";
import RecommendedProducts from "../components/Product/RecommendedProducts";

// Displays loading screen, product error screen and product screen

function IndividualProducts() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProduct(id); // Product details
  const {
    products,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(); 

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product && products.length > 0) {
      const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id) // Match category, exclude current product
        .slice(0, 3); // Limit to 3
  
      setFilteredProducts(relatedProducts);
    }
  }, [product, products]); // Re-run when product or products change

  if (productLoading || productsLoading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    );
  }

  if (productError || productsError) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-xl text-red-500">
            Error: {productError || productsError}
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-gray-200  rounded-md"
          >
            Back to Products
          </button>
        </div>
      </Layout>
    );
  }

  if (product) {
    return (
      <Layout>
        <div className="w-full h-full flex flex-col items-center">
          <ProductDetailCard product={product} onAddToCart={addToCart} />

          <RecommendedProducts products={filteredProducts} onAddToCart={addToCart} title="Related Products" />
        </div>
      </Layout>
    );
  }

  return null;
}

export default IndividualProducts;
