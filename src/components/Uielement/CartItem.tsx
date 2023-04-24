import React from 'react'
import ChevronDown from '../../assets/icons/ChevronDown'
import ChevronUp from '../../assets/icons/ChevronUp'

const CartItem = ({item,increase,decrease}:any) => {
  return (
    <div className="flex justify-between items-center mb-3">
    <div className="flex  gap-5">
      <div className=''>
         <img src={item.images.small} width={80} height={90} alt="" />
      </div>
      <div className="">
        <p className="font-bold">{item.name}</p>
        <p className="text-xs">$ {item?.cardmarket?.prices?.averageSellPrice} per card</p>
        <div className="text-xs mt-9">
          <span className="text-red-500 font-bold"> {item.set.total} </span>
          <span>cards left</span>
        </div>
      </div>
    </div>
    <div>
      <div className="relative">
        <p className="font-bold text-[#1040E2] min-w-[54px]">{item.number}</p>
        <div className="absolute top-[-5px] right-5">
             <div className='cursor-pointer mb-1' onClick={()=> increase(item.id)}><ChevronUp/></div>
             <div className='cursor-pointer' onClick={()=>decrease(item.id)}><ChevronDown/></div>
        </div>
      </div>
      <p className="text-xs mt-6">price</p>
      <div className="each-item-mount">
        <p className="font-bold text-[#1040E2]">${item?.perCard.toFixed(2)}</p>
      </div>
    </div>
  </div>
  )
}

export default CartItem
