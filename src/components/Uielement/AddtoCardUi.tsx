import React from "react";
import Close from "../../assets/icons/Close";
import useGlobal from "../../hooks/useGlobal";
import CartItem from "./CartItem";
import Swal from "sweetalert2";

const AddtoCardUi = ({ addCart }: any) => {
  const {
    open,
    CloseCard,
    increase,
    amount,
    decrease,
    isTotalCard,
    isTotalPrice,
    setAddCart,
    clearAll,
    removeItem
  } = useGlobal();

  function PayNow() {
    CloseCard();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Payment Success!",
      showConfirmButton: true,
    });
    setAddCart([]);
  }

  return (
    <div
      className={`absolute   top-0 left-0 w-full h-screen flex items-center justify-center transition all duration-500 ease-in-out bg-[#00000020] ${
        open ? "z-[500] opacity-100 delay-0" : "z-[-500] opacity-0 delay-300"
      } `}
    >
      <div
        className={`p-8  rounded-[15px]  w-[400px] bg-white relative transition-all duration-500 ease-in-out ${
          open ? "opacity-100 delay-300" : "opacity-0 delay-0"
        }`}
      >
        {/* //Cart */}
        <div
          className={` overflow-y-scroll transition-all duration-500 ease-in-out ${
            open ? "h-[294px] delay-500 opacity-100" : "h-[0] delay-0 opacity-0"
          }`}
        >
          {addCart.length > 0 ? (
            addCart.map((value: any, key: React.Key) => {
              return (
                <CartItem
                  item={value}
                  increase={increase}
                  decrease={decrease}
                  amount={amount}
                  removeItem={removeItem}
                  key={key}

                />
              );
            })
          ) : (
            <p className="text-center text-3xl pt-4 font-bold">Empty Cart</p>
          )}

          <div
            className="w-full mb-2 absolute z-50 bottom-[165px] left-0 py-5 shadow-sm  "
            style={{
              background: "linear-gradient(#ffffff50 , #ffffff)",
              filter: "blur(10px)",
            }}
          ></div>
        </div>

        <div onClick={clearAll} className=" cursor-pointer text-[#6d6d6d] text-xs text-center py-3">
          <p className=" underline">Clear all</p>
        </div>
        <div className="flex justify-center ">
          <table className="w-[60%]">
            <tbody>
              <tr className="h-[30px]">
                <td className="text-sm">Total cards</td>
                <td className="text-red-500 font-bold text-sm">
                  {isTotalCard}
                </td>
              </tr>
              <tr className="h-[30px]">
                <td className="text-base font-bold">Total price</td>
                <td className="text-red-500 font-bold ">
                  $ {isTotalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div onClick={PayNow} className="mt-4 cursor-pointer text-center">
          <button className="px-10 py-2 bg-[#298BFD] rounded-[20px] text-white text-sm">
            Pay Now
          </button>
        </div>
        <div
          onClick={CloseCard}
          className=" cursor-pointer absolute bg-red-500 p-2 rounded bottom-[-14px] left-[50%] translate-x-[-50%]"
        >
          <Close />
        </div>
      </div>
    </div>
  );
};

export default AddtoCardUi;
