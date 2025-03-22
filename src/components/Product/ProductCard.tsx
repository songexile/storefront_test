import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from './product.interface';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => (
  <div className='w-full max-w-xs mx-auto h-full flex items-center flex-col justify-between gap-4 bg-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow'>
    
    <Link to={`/products/${product.id}`} className="w-full flex flex-col items-center flex-grow">
      {/* Product Image */}
      <div className="w-full flex justify-center py-4">
        <img 
          className='object-contain h-40 w-40 rounded-xl' 
          src={product.image} 
          alt={product.title}
        />
      </div>
      
      {/* Product Info */}
      <div className='text-center'>
        <h2 className='font-medium text-gray-800 line-clamp-2 h-12'>{product.title}</h2>
        <p className='text-xl font-semibold mt-2'>${product.price.toFixed(2)}</p>
      </div>
    </Link>
    
    {/* Add to Cart Button */}
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Prevent Link from triggering
        onAddToCart(product);
      }} 
      className='w-full p-3 rounded-md bg-white hover:bg-orange-500 hover:text-white transition-all font-medium cursor-pointer'
    >
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
