import React, { useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/cart'
import { useProduct, useProducts } from '../hooks/fetchProducts'  // Import custom hooks
import ProductDetailCard from '../components/Product/ProductDetailCard'  // Import the detail card
import ProductCard from '../components/Product/ProductCard'  // Import product card
import { Product } from '../components/Product/product.interface'

function IndividualProducts() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()
  
  const { product, loading: productLoading, error: productError } = useProduct(id)  // Product details
  const { products, isLoading: productsLoading, error: productsError } = useProducts(3) // Top 3 products

  if (productLoading || productsLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    )
  }

  if (productError || productsError) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-64 gap-4">
          <p className="text-xl text-red-500">Error: {productError || productsError}</p>
          <button 
            onClick={() => navigate('/products')} 
            className="px-4 py-2 bg-gray-200 text-white rounded-md"
          >
            Back to Products
          </button>
        </div>
      </Layout>
    )
  }

  if (product) {
    return (
      <Layout>
        <div className="w-full h-full flex flex-col items-center">
          <ProductDetailCard 
            product={product} 
            onAddToCart={addToCart} 
          />
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recommended Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((prod: Product) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return null
}

export default IndividualProducts
