import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url,{
      method : 'get'
    })
    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])


  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-slate-400 hover:bg-slate-400 hover:text-white transition-all py-2 px-4 rounded-full'
                onClick={()=> setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/** All Products */}

      <div className='flex items-center flex-wrap  h-[calc(100vh-190px)]  gap-3 py-4  overflow-y-scroll'>
       {
         allProduct.map((product,index)=>{
          return(
            <AdminProductCard data={product} key = {index+"allProduct"} fetchdata={fetchAllProduct}/>
            )
          })
        }
      </div>

      {/** Upload Product */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=> setOpenUploadProduct(false)} fetchData= {fetchAllProduct}/>
        )
      }
      
    </div>
  )
}

export default AllProducts