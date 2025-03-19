import React from 'react'
import Layout from '../components/Layout/Layout'
import heroImage from '../assets/images/heroImage.jpg'

function HomePage() {
  return (
    <Layout>
      <div className='h-screen w-screen bg-gray-200 flex flex-col items-center justify-start'>
        <div className='flex items-start w-2/3 h-1/3  rounded-md mt-32 justify-center flex-col'>

        <img src={heroImage} className=' '>

      </img>
      <h1 className='text-2xl'>Quality Clothes based in Christchurch</h1>


      {/* Put in a API which shows best sellers (three products) */}

        </div>
      </div>
    </Layout>
  )
}

export default HomePage
