import React from 'react'
import HeaderPage from '../components/Header'
import SpecialityBox from '../components/Speicality'
import BannerPage from '../components/Banner'
import Topvendors from '../components/TopVendors'

const Homepage = () => {
  return (
    <div>
      <HeaderPage/>
      <SpecialityBox/>
      <Topvendors/>
      <BannerPage/>
    </div>
  )
}

export default Homepage