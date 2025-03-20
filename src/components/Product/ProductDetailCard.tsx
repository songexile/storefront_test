import React from 'react';
import { Product } from './product.interface';

interface ProductDetailCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, onAddToCart }) => (
  <div className='flex flex-col md:flex-row max-w-4xl mx-auto mt-8 gap-8 p-6 bg-gray-200  rounded-xl shadow-md'>
    
    {/* Product Image */}
    <div className='w-full md:w-1/2 flex justify-center items-start'>
      <img 
        className='object-contain h-64 w-64 rounded-xl border border-gray-200 p-4 bg-white' 
        src={product.image} 
        alt={product.title}
      />
    </div>
    
    {/* Product Details */}
    <div className='w-full md:w-1/2 flex flex-col gap-4 '>
      <h1 className='text-2xl font-semibold text-gray-800'>{product.title}</h1>
      
      <div className='flex items-center gap-2'>
        <span className='text-2xl font-bold text-gray-900'>${product.price.toFixed(2)}</span>
        {product.rating && (
          <div className='ml-4 flex items-center bg-blue-50 px-2 py-1 rounded-md'>
            <span className='text-yellow-500'>★</span>
            <span className='ml-1 text-sm'>
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
        )}
      </div>
      
      <div className='mt-2'>
        <h2 className='text-lg font-medium mb-2'>Description</h2>
        <p className='text-gray-600'>{product.description}</p>
      </div>
      
      <button 
        onClick={() => onAddToCart(product)} 
        className='mt-6 p-3 rounded-md bg-white hover:bg-orange-500 text-black font-medium transition-all'
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductDetailCard;
