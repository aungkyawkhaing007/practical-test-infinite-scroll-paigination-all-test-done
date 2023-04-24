import React from 'react'
import Cart from "../../assets/icons/cart";
import useGlobal from '../../hooks/useGlobal';

const ViewCartButton = ({addCart}:any) => {
     const {OpenCard} = useGlobal()
  return (
    <div className='' onClick={OpenCard}>
          <div className="fixed bottom-3 left-[50%] z-[100] translate-x-[-50%]">
          <button disabled={addCart.length > 0 ? false : true} className="px-3 py-2 flex relative  bg-[#1040E2] text-white text-sm rounded">
             {addCart.length > 0 && <span className="px-2 py-1 rounded-[20px] top-[-10px] left-[-10px] text-xs absolute bg-red-500">{addCart.length}</span> }
            <span className="mr-2">
              <Cart />
            </span>
            View Cart
          </button>
        </div>
    </div>
  )
}

export default ViewCartButton
