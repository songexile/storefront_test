import React, { useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout/Layout'
import { Product } from '../components/Product/product.interface'
import {useParams} from "react-router-dom";
import { CartContext } from '../context/cart';



function ProductCard(productData: Product){
    const {addToCart } = useContext(CartContext)
    return (
        <div className='flex items-center mt-16 justify-center'>

        <div key={productData.id} className='w-full h-full flex items-center flex-col justify-center  gap-8 bg-gray-200 p-8 rounded-xl'>
        <img className=' object-cover  h-32  w-32 rounded-2xl border border-b-2' src={productData.image} alt={productData.desc}></img>
        <div className='flex items-center flex-col gap-4 justify-center'>

        <h1 className='font-light'>{productData.title} </h1>
        <h1 className='text-xl'>${productData.price}</h1>
        </div>
       <h1 className='w-52'>{productData.description}</h1>

        <button onClick={() => addToCart(productData)} className='p-2 rounded-md bg-white hover:bg-orange-500 transition-all'>Add to cart</button>
        </div>
        
      </div>
    )
}

function IndividualProducts() {
    const [productData, setProductData] = useState<Product>()
    const [loading, setLoading] = useState<Boolean>(true)
    const {id} = useParams();


    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setProductData(data);
                setLoading(false)
            });
    }, []);

    if(loading && !productData)
    {
       <h1>Loading</h1> 
    }

    if(productData)
    {
        return (
        
        <Layout>

<ProductCard title={productData.title} description={productData.description} id={productData.id} image={productData.image} price={productData.price}/>
        </Layout>

        )
    }

   

 
}
export default IndividualProducts


