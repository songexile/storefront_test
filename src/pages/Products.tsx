import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Product } from '../components/Product/product.interface'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cart';

function Products({ limit }: { limit?: number }) {
  const { addToCart } = useContext(CartContext)
  const [productData, setProductData] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Function to return all products or limited number
  const getProducts = (data: Product[], itemLimit?: number) => {
    if (itemLimit && itemLimit > 0) {
      return data.slice(0, itemLimit)
    }
    return data
  }
  
  useEffect(() => {
    setIsLoading(true)
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }
        return res.json();
      })
      .then((data) => {
        setProductData(data);
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setIsLoading(false)
      });
  }, []);
  
  const displayProducts = getProducts(productData, limit)
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading products...</p>
        </div>
      </Layout>
    )
  }
  
  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-red-500">Error: {error}</p>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className='grid grid-cols-1 mt-32 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-16 xl:px-32'>
        {displayProducts.map((product) => (
          <div 
            key={product.id} 
            className='w-full max-w-xs mx-auto h-full flex items-center flex-col justify-between gap-4 bg-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow'
          >
            <div className="w-full flex justify-center py-4">
              <img 
                className='object-contain h-40 w-40 rounded-xl' 
                src={product.image} 
                alt={product.title}
              />
            </div>
            
            <div className='flex items-center flex-col gap-2 justify-center flex-grow'>
              <Link to={`/products/${product.id}`} className="text-center hover:text-orange-500 transition-colors">
                <h2 className='font-medium text-gray-800 line-clamp-2 h-12'>{product.title}</h2>
                <p className='text-xl font-semibold mt-2'>${product.price.toFixed(2)}</p>
              </Link>
            </div>
            
            <button 
              onClick={() => addToCart(product)} 
              className='w-full p-3 rounded-md bg-white hover:bg-orange-500 hover:text-white transition-all font-medium'
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Products