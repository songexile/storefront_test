import { useState, useEffect } from "react";
import { Product } from "../components/Product/product.interface";

export const useFilters = (products: Product[])  => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Update maxPrice and categories when products change
  useEffect(() => {
    if (products.length > 0) {
      setMaxPrice(Math.max(...products.map(product => product.price)));
      setCategories([...new Set(products.map(product => product.category))]);
    }
  }, [products]);

  // Apply filters
  const filteredProducts = products
    .filter(product => product.price > minPrice)
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory);

  // Reset filters
  const clearFilters = () => {
    setMinPrice(0);
    setSelectedCategory('all');
  };

  return {
    filteredProducts,
    minPrice,
    setMinPrice,
    maxPrice,
    categories,
    selectedCategory,
    setSelectedCategory,
    clearFilters
  };
};