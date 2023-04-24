import api from "..";

export const ListOfRarity = async(
    
)=>{
 const res = await api.get(`/rarities`)
 
 return res.data

}


export const ListOfTypes = async(
    
    )=>{
     const res = await api.get(`/rarities`)
     
     return res.data
    
}

export const ListOfSet = async(
    
    )=>{
     const res = await api.get(`/sets`)
     
     return res.data
    
}