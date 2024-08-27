import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct/>
      
      <HorizontalCardProduct category={"airpodes"} heading= {"Top Quality Airpodes"}/>
      <HorizontalCardProduct category={"speakers"} heading= {"Best Sound & Bass"}/>
      <HorizontalCardProduct category={"watches"} heading= {"Good & Fit"}/>
      <HorizontalCardProduct category={"Mouse"} heading= {"Ease to Scroll"}/>
      <HorizontalCardProduct category={"trimmers"} heading= {"Groom with style"}/>
      <HorizontalCardProduct category={"earphones"} heading= {"Best Brand Product"}/>

      <VerticalCardProduct category={"mobiles"} heading= {"Latest Mobiles & Accessories"}/>
      <VerticalCardProduct category={"televisions"} heading= {"See With new View"}/>
      <VerticalCardProduct category={"airconditioner"} heading= {"Feel the Wind"}/>
      <VerticalCardProduct category={"refrigerator"} heading= {"Best Summer Deal"}/>
      <Footer />
    </div>
    
  )
}

export default Home