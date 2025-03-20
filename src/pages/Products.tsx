import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { CartContext } from "../context/cart";
import { useProducts } from "../hooks/fetchProducts";
import ProductCard from "../components/Product/ProductCard";

function Products({ limit }: { limit?: number }) {
  const { addToCart } = useContext(CartContext);
  const { products, isLoading, error } = useProducts(limit);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading products...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-32 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Products;
