import React from 'react'
import logo from '../assest/logo-no-background.png'

const Logo = ( {w,h}) => {
  return (
    <img className=' cursor-pointer' width={w} height={h} src={logo}/>
  )
}

export default Logo
