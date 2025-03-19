import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { Product } from '../components/Product/product.interface'
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from '../context/cart';


function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) {
  return (
    <div className='flex flex-col md:flex-row max-w-4xl mx-auto mt-8 gap-8 p-6 bg-white rounded-xl shadow-md'>
      {/* Product Image */}
      <div className='w-full md:w-1/2 flex justify-center items-start'>
        <img 
          className='object-contain h-64 w-64 rounded-xl border border-gray-200 p-4 bg-white' 
          src={product.image} 
          alt={product.title}
        />
      </div>
      
      {/* Product Details */}
      <div className='w-full md:w-1/2 flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>{product.title}</h1>
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-bold text-gray-900'>${product.price.toFixed(2)}</span>
          {product.rating && (
            <div className='ml-4 flex items-center bg-blue-50 px-2 py-1 rounded-md'>
              <span className='text-yellow-500'>★</span>
              <span className='ml-1 text-sm'>{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
          )}
        </div>
        
        <div className='mt-2'>
          <h2 className='text-lg font-medium mb-2'>Description</h2>
          <p className='text-gray-600'>{product.description}</p>
        </div>
    
        
        <button 
          onClick={() => onAddToCart(product)} 
          className='mt-6 p-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all flex items-center justify-center gap-2'
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  )
}

function IndividualProducts() {
  const [productData, setProductData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    setLoading(true)
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Product not found (${res.status})`)
        }
        return res.json()
      })
      .then((data) => {
        setProductData(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching product:", err)
        setError(err.message)
        setLoading(false)
      })
  }, [id]) // Added id as dependency
  
  // Handle loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    )
  }
  
  // Handle error state
  if (error) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-xl text-red-500">Error: {error}</p>
          <button 
            onClick={() => navigate('/products')} 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            Back to Products
          </button>
        </div>
      </Layout>
    )
  }
  
  // Handle successful data fetch
  if (productData) {
    return (
      <Layout>
        <ProductCard 
          product={productData} 
          onAddToCart={addToCart} 
        />
      </Layout>
    )
  }
  
}

export default IndividualProducts