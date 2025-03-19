import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { Product } from '../components/Product/product.interface'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/cart';


//Write function to return 3 items

//Write function to return all

//This can be used on homepage and also on product list page

function Products() {
    const {addToCart } = useContext(CartContext)
  const [productData, setProductData] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setProductData(data);
      });
  }, []);

  return (
    <Layout>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-8 mx-32'>
      {productData.map((product) => (
          <div key={product.id} className='w-64 h-full flex items-center flex-col justify-center  gap-8 bg-gray-200 p-8 rounded-xl'>
            <img className=' object-cover  h-32  w-32 rounded-2xl border border-b-2' src={product.image} alt={product.desc}></img>
            <div className='flex items-center flex-col gap-4 justify-center'>
<Link to={`/products/${product.id}`}>

            <h1 className='font-light'>{product.title} </h1>
            <h1 className='text-xl'>${product.price}</h1>
          </Link>
            </div>
           
           

            <button onClick={() => addToCart(productData)} className='p-2 rounded-md bg-white hover:bg-orange-500 transition-all'>Add to cart</button>
            
          </div>
      ))}
      </div>

    </Layout>
  )
}

export default Products
