import React, { useContext } from "react";
import Layout from "../components/Layout/Layout";
import { CartContext } from "../context/cart";
import { useProducts } from "../hooks/fetchProducts";
import ProductCard from "../components/Product/ProductCard";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useFilters } from "../hooks/useFilters";
import LoadingState from "../components/UI/LoadingState";
import ErrorState from "../components/UI/ErrorState";
import productsBanner from "../assets/images/heroImage.jpg"; // Ensure this image exists

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
    clearFilters,
  } = useFilters(products);

  if (isLoading || error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          {isLoading ? (
            <LoadingState />
          ) : (
            <ErrorState message={error || "An unknown error occurred"} />
          )}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-32 px-4 sm:px-6 lg:px-8">
        {/* Page Banner */}
        <div className="relative w-full h-64 mb-8">
          <img
            src={productsBanner}
            alt="Products Banner"
            className="w-full h-full object-cover rounded-md shadow-lg"
          />
         
        </div>

        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Price</h3>
            <p>Above: ${minPrice}</p>
            <Slider
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(value) => typeof value === "number" && setMinPrice(value)}
              step={50}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {(minPrice > 0 || selectedCategory !== "all") && (
            <div>
              <h3 className="text-lg font-medium mb-2">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {minPrice > 0 && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Price: ${minPrice}
                  </span>
                )}
                {selectedCategory !== "all" && (
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Category: {selectedCategory}
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 text-gray-600">
          {filteredProducts.length} product(s) found
        </div>

        {/* Products Grid */}
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
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-500">No products match your filters.</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Products;
