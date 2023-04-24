import React, { useEffect, useState,useRef,useCallback } from "react";
import useGlobal from "../../hooks/useGlobal";
import { ListOfCard } from "../../api/listCard";
import Header from "../../components/Uielement/Header";
import CardListsUi from "../../components/Uielement/CardListsUi";
import Footer from "../../components/Uielement/Footer";
import FilterList from "../../components/Uielement/FilterList";
import SearchIcon from "../../assets/icons/SearchIcon";
import ViewCartButton from "../../components/Uielement/ViewCartButton";
import AddtoCardUi from "../../components/Uielement/AddtoCardUi";
import { ListOfRarity, ListOfSet, ListOfTypes } from "../../api/FilterApi";
import LoadingSpinner from "../../components/Uielement/LoadingSpinner";
import api from "../../api";

const Market = () => {
  const {
    cardList,
    setCardList,
    addCart,
    setAddCart,
    setRarityListData,
    rarityListData,
    setTypeListData,
    typeListData,
    setListSetData,
    listSetData,
  } = useGlobal();

  const [typeValue, setTypeValue] = useState<string>("");
  const [rarityValue, setRarityValue] = useState<string>("");
  const [valueSets, setValueSets] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recordPerPage, setRecordPerPage] = useState<number>(12);
  const [LoadMoreLoading, setLoadMoreLoading] = useState(false);
  
  const Observer =useRef();
  //@ts-ignore
  const lastPostRef = useCallback(node =>{
    //@ts-ignore
    if(Observer.current) Observer.current?.disconnect()
    //@ts-ignore
    Observer.current =new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
            LoadMore()
        }
    })
    //@ts-ignore
    if (node) Observer.current.observe(node)
    
    console.log(node)
  },[recordPerPage])


  //fetchAllCardList
  useEffect(() => {
    if (!typeValue && !rarityValue && !valueSets && !nameValue) {
      ListOfCard(recordPerPage)
        .then((res) => {
          setCardList(res.data);
          if (LoadMoreLoading) {
            setLoadMoreLoading(false);
          } else {
            setIsLoading(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      LoadMoreFetch();
    }
  }, [recordPerPage]);

  console.log(cardList);

  //Fetch filter List
  useEffect(() => {
    RarityList();
    TypeList();
    SetLists();
  }, []);

  //rarityList
  async function RarityList() {
    const res = await ListOfRarity();
    setRarityListData(res.data);
  }

  //typeList
  async function TypeList() {
    const res = await ListOfTypes();
    setTypeListData(res.data);
  }

  //setList
  async function SetLists(){
    const res = await ListOfSet();
    setListSetData(res.data);
  }

  //getValue and setValue
  function actionType(e: any):void {
    setTypeValue(e.target.value);
    setRarityValue("");
    setNameValue("");
    setValueSets("");
  }

  //getValue and setValue
  function actionRrity(e: any):void {
    setRarityValue(e.target.value);
    setTypeValue("");
    setNameValue("");
    setValueSets("");
  }

  //getValue and setValue
  function actionSet(e: any) {
    setValueSets(e.target.value);
    setRarityValue("");
    setNameValue("");
    setTypeValue("");
  }

  //getValue and setValue

  function actionName(e: any) {
    setNameValue(e.target.value);
    setTypeValue("");
    setRarityValue("");
    setValueSets("");
  }

  //multiple select and add to cart
 function handleSelect(item: any): void {
    if (addCart.find((value) => value.id === item.id)) {
      const filterValue = addCart.filter((el) => el.id !== item.id);
      setAddCart(filterValue);
    } else {
      setAddCart([
        ...addCart,
        {
          ...item,
          perCard: item?.cardmarket?.prices?.averageSellPrice,
          totalCard: 0,
          totalPrice: 0,
        },
      ]);
    }
  }

  //nameFilter , typeFilter , rarityFilter , setFilter

  function FilterCard():void {
    let queryParams = "";
    if (nameValue) {
      queryParams = `name:${nameValue}`;
    }
    if (typeValue) {
      queryParams = `types:${typeValue}`;
    }
    if (rarityValue) {
      queryParams = `rarity:${rarityValue}`;
    }
    if (valueSets) {
      queryParams = `set:${valueSets}`;
    }

    setIsLoading(true);
    api
      .get(`/cards?q=${queryParams}&pageSize=${recordPerPage}`)
      .then((res) => {
        setCardList(res.data.data);
        setIsLoading(false);

        return res;
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }

  function Reset():void {
    setIsLoading(true);
    ListOfCard(recordPerPage)
      .then((res) => {
        setCardList(res.data);
        if (LoadMoreLoading) {
          setLoadMoreLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setNameValue("");
    setTypeValue("");
    setRarityValue("");
    setValueSets("");
  }

  function LoadMoreFetch():void{
    let queryParams = "";
    if (nameValue) {
      queryParams = `name:${nameValue}`;
    }
    if (typeValue) {
      queryParams = `types:${typeValue}`;
    }
    if (rarityValue) {
      queryParams = `rarity:${rarityValue}`;
    }
    if (valueSets) {
      queryParams = `set:${valueSets}`;
    }
    api
      .get(`/cards?q=${queryParams}&pageSize=${recordPerPage}`)
      .then((res) => {
        setCardList(res.data.data);
        setLoadMoreLoading(false);
        return res;
      })
      .catch((err) => {});
  }

  function LoadMore():void{
    setRecordPerPage((prev) => +prev + 12);
    setLoadMoreLoading(true);
  }

  return (
    <section className="">
      <Header />
      <AddtoCardUi addCart={addCart} />
      <div className="h-[calc(100vh-61px)] overflow-y-scroll">
        <div className="flex flex-col md:flex-row justify-center items-center gap-1 mt-10">
          <FilterList
            rarityList={rarityListData}
            typeList={typeListData}
            listSets={listSetData}
            typeValue={typeValue}
            rarityValue={rarityValue}
            valueSets={valueSets}
            nameValue={nameValue}
            actionType={actionType}
            actionRarity={actionRrity}
            actionSet={actionSet}
            actionName={actionName}
          />
          <div className=" flex">
            <button
              onClick={FilterCard}
              className="px-3 py-2 bg-[#FDCE29] text-sm   text-white rounded-[20px]"
            >
              Search
            </button>
            <button
              onClick={Reset}
              className="px-3 py-2 bg-[#000] ml-1 text-sm   text-white rounded-[20px]"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  mt-10 justify-items-center">
          {isLoading ? (
            <>
              <div className="col-span-3">
                <LoadingSpinner />
              </div>
            </>
          ) : (
            <>
              {cardList.length > 0 ? (
                cardList.map((item, key: React.Key) => (
                  <CardListsUi
                    key={key}
                    item={item}
                    addCart={addCart}
                    action={() => handleSelect(item)}
                  />
                ))
              ) : (
                <>
                  <p className=" col-span-3 text-[4xl] font-bold">
                    There is no cards
                  </p>
                </>
              )}
            </>
          )}
        </div>
        {LoadMoreLoading ? (
          <div className="pb-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {isLoading || (
              //@ts-ignore
              <div ref={lastPostRef} className="text-sm font-bold flex justify-center pb-20 cursor-pointer">
                <span>
                  <SearchIcon />
                </span>
                <span onClick={LoadMore}>show more</span>
              </div>
            )}
          </>
        )}
      </div>
      <ViewCartButton addCart={addCart} />
      <Footer />
    </section>
  );
};

export default Market;
