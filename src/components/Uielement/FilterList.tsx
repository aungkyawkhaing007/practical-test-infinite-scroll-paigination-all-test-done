import React from "react";

const FilterList = ({
  rarityList,
  typeList,
  listSets,
  typeValue,
  rarityValue,
  valueSets,
  actionType,
  actionRarity,
  actionSet,
  actionName,
  nameValue,
  
  
}) => {
  return (
    <div className="bg-[#fff]  text-sm flex items-center mt-3 mb-4  text-[#6d6d6d] rounded-[20px] h-[40px] px-3">
      <div className="border-r w-[120px] lg:w-[150px] overflow-hidden">
        <div className="py-2">
          <input onChange={actionName} value={nameValue}  type="text" className="outline-none text-xs" placeholder="Name.." />
        </div>
      </div>
      <div className="border-r w-[90px] lg:w-[150px] overflow-hidden">
        <div className="py-2 px-3">
          <select onChange={actionType} name="" value={typeValue} id="" className=" outline-none text-xs">
            <option value="" className="text-xs" selected>
              Type
            </option>
            {typeList.map((item: string, key: React.Key) => {
              return (
                <option className="text-xs" key={key} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="border-r w-[90px] lg:w-[150px] overflow-hidden">
        <div className="py-2 px-3">
          <select onChange={actionRarity} name="" value={rarityValue} className="outline-none text-xs" id="">
            <option value="" className="text-xs" selected>
              Rarity
            </option>
            {rarityList.map((item: string, key: React.Key) => {
              return (
                <option className="text-xs" key={key} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className=" w-[50px] lg:w-[70px] overflow-hidden">
        <div className="py-2 px-3">
          <select onChange={actionSet} value={valueSets} name="" id="" className="outline-none text-xs ">
            <option className="text-xs" value="" selected>
              Set
            </option>

            {listSets.map((item: any, key: React.Key) => {
              return (
                <option className="text-xs" key={key} value={item.id}>
                  {item.id}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterList;
