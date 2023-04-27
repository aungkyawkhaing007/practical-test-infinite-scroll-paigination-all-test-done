import React from "react";

const CardListsUi = ({ item, action, addCart }: any) => {
  return (
    <div onClick={action}>
      <div className="bg-[#fff] w-[240px] shadow rounded-[15px] mt-[130px] cursor-pointer py-3 px-10 mb-16">
        <div className=" flex justify-center mt-[-150px]">
          <img src={item?.images?.large} alt="" />
        </div>
        <p className="text-center text-[17px] font-bold mt-3">{item.name}</p>
        <p className="text-[#0F6DB0] text-[13px] text-center">{item.rarity || "_"}</p>
        <div className="flex text-[#6d6d6d] text-sm mb-3 justify-center space-x-10">
          <p>$ {item?.cardmarket?.prices?.averageSellPrice}</p>
          <p>{item?.set?.total} Left</p>
        </div>
        <div className="text-center mb-[-30px]">
          <button
            className={`px-4 py-2 text-sm font-[500] rounded-[20px] ${
              addCart.find((value: any) => value.id === item.id)
                ? "bg-[#000] text-white"
                : "bg-[#FDCE29] "
            }`}
          >
            {addCart.find((value: any) => value.id === item.id) ? (
              <>Selected</>
            ) : (
              <>Select Card</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardListsUi;
