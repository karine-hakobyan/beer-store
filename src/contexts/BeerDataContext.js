import React, { createContext, useState } from 'react';

export const BeerDataContext = createContext();

const BeerDataContextProvider = (props) => {

    const [beers, setBeers] = useState([])
    const [cartContent, setContent] = useState([])
    const [cartCount, setCount] = useState(Number(localStorage.getItem('count')) || 0)
    

    return ( 
        <BeerDataContext.Provider value={{beers, setBeers, cartContent, setContent, cartCount, setCount}}>
            {props.children}
        </BeerDataContext.Provider>
     );
}

export default BeerDataContextProvider; 