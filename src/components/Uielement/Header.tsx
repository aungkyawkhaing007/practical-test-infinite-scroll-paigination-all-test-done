import React from 'react'
import Logo from '../../assets/Logo.png'

const Header = () => {
  return (
    <div className='pt-3 pb-4 bg-[#F8F8F8] relative w-full'>
           <p className='text-center text-[22px] font-bold '>TCG Marketplace</p>
           <div className='absolute translate-x-[-50%] left-[50%] bottom-[-20px]'>
               <img src={Logo} alt="" />
           </div>
    </div>
  )
}

export default Header
