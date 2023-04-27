import { createContext, Dispatch, SetStateAction, useState,useEffect } from "react";

interface ContextProps {
  children: JSX.Element;
}

interface IContext {
  cardList: any[];
  setCardList: Dispatch<SetStateAction<any[]>>;
  OpenCard: () => void;
  CloseCard: () => void;
  open: boolean;
  addCart: any[];
  setAddCart: Dispatch<SetStateAction<any[]>>;

  increase: any;
  decrease: any;
  isTotalCard:number;
  isTotalPrice:number;
  setRarityListData:Dispatch<SetStateAction<any[]>>
  rarityListData:any;
  setTypeListData:Dispatch<SetStateAction<any[]>>;
  typeListData:any
  setListSetData:Dispatch<SetStateAction<any[]>>;
  listSetData:any
  clearAll:()=>void
  removeItem:(id:string)=>void
}

export const AllContext = createContext({} as IContext);

const GlobalContext = ({ children }: ContextProps) => {
  const [cardList, setCardList] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [isTotalCard,setIsTotalCard] = useState(0);
  const [isTotalPrice,setIsTotalPrice] = useState(0);
  const [rarityListData,setRarityListData] = useState([]);
  const [typeListData,setTypeListData] = useState([]);
  const [listSetData,setListSetData] = useState([]);

  useEffect(()=>{
    calculateTotal();
  },[addCart])

  function OpenCard(): void {
    setOpen(true);
  }

  function CloseCard(): void {
    setOpen(false);
  }

  
  function clearAll():void{
    setAddCart([])
    calculateTotal()
}


function removeItem(id:string):void{
  let remove= addCart.filter((item) => item.id !== id);
   
  setAddCart(remove)
  calculateTotal()
  
}

  //increaseItem
  function increase(id: string) {
    let cartItemIncrease = addCart.find((item) => item.id === id);

    if(cartItemIncrease.set.total==1){
       return;
    }

    cartItemIncrease.number = +cartItemIncrease.number + 1;

    cartItemIncrease.set.total = cartItemIncrease.set.total - 1;

    cartItemIncrease.perCard = cartItemIncrease.perCard + cartItemIncrease?.cardmarket?.prices?.averageSellPrice
    
    

    calculateTotal()
  }

  // decreaseItem
  function decrease(id: string) {
    let cartItemDecrease = addCart.find((item) => item.id === id);
    if (cartItemDecrease.number == 1) {
      return;
    }
    cartItemDecrease.number = cartItemDecrease.number - 1;

    cartItemDecrease.set.total = cartItemDecrease.set.total + 1;

    cartItemDecrease.perCard = cartItemDecrease.perCard - cartItemDecrease?.cardmarket?.prices?.averageSellPrice

    
    calculateTotal()
  }



  //Calculate total
  function calculateTotal(){
      let totalCard = 0;
      let totalPrice =0;
      addCart.forEach((item)=>{
          totalCard += +item.number
          totalPrice +=  item.perCard
      })
      setIsTotalCard(totalCard);
      setIsTotalPrice(totalPrice);
  }

  return (
    <AllContext.Provider
      value={{
        setTypeListData,
        removeItem,
        clearAll,
        listSetData,
        setListSetData,
        typeListData,
        rarityListData,
        setRarityListData,
        isTotalCard,
        isTotalPrice,
        increase,
      
        decrease,
        
        cardList,
        setCardList,
        CloseCard,
        OpenCard,
        open,
        addCart,
        setAddCart,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};

export default GlobalContext;
