import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { CartContext } from "../context/cart";
import { useProducts } from "../hooks/fetchProducts";
import ProductCard from "../components/Product/ProductCard";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Product } from "../components/Product/product.interface";
import { useFilters } from "../hooks/useFilters";

function Products({ limit }: { limit?: number }) {
  const { addToCart } = useContext(CartContext);
  const { products, isLoading, error } = useProducts(limit);
  const {
    filteredProducts,
    minPrice,
    setMinPrice,
    maxPrice,
    categories,
    selectedCategory,
    setSelectedCategory,
    clearFilters
  } = useFilters(products);

  // Loading and error states
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
        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Filter by Price</h3>
          <p>Products with price above: ${minPrice}</p>
          <Slider
            min={0}
            max={maxPrice}
            value={minPrice}
            onChange={(value) => typeof value === "number" && setMinPrice(value)}
            step={50}
          />
        </div>
        
        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm ${
                selectedCategory === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Active Filters */}
        {(minPrice > 0 || selectedCategory !== 'all') && (
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              {minPrice > 0 && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Price: ${minPrice}
                </div>
              )}
              {selectedCategory !== 'all' && (
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                </div>
              )}
              <button 
                onClick={clearFilters}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results count */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-xl text-gray-500">No products match your filters</p>
              <button 
                onClick={clearFilters}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Products;