import React, { createContext,useState} from "react";

export const ShopProductsContext = createContext(null);

const ShopProductsContextProvider = (props)=>{
    const [products,setProducts] = useState([])
    const [newCollection,setNewCollection] = useState([])
    const [popularProducts,setPopularProducts] = useState([])

    const [page,setPage]=useState({"men":1,"women":1,"kid":1})
    const [lastPageFetched,setLastPageFetched]=useState({"men":0,"women":0,"kid":0})
    const contextValue = {products,setProducts,page,setPage,lastPageFetched,setLastPageFetched,newCollection,setNewCollection,popularProducts,setPopularProducts};

    return (
        <ShopProductsContext.Provider value={contextValue} >
            {props.children}
        </ShopProductsContext.Provider>
    )
}

export default ShopProductsContextProvider