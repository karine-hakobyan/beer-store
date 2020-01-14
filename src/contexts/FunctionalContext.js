import React, { createContext, useContext } from 'react';
import { backendSearchUrl, itemName } from '../App';
import axios from 'axios';
import { BeerDataContext } from './BeerDataContext';


export const FunctionalContext = createContext();

const FunctionalContextProvider = (props) => {

    const { setBeers, cartContent, setContent, cartCount, setCount } = useContext(BeerDataContext)

    const getBeers = page => {
        axios.get(backendSearchUrl + page)
            .then(res => {
                setBeers(res.data);
            });
    };

    const handleAdd = id => {

        const localBeerData = localStorage.getItem(itemName);
        const localCountData = localStorage.getItem('count')

        if (localBeerData === null || localCountData === null) {

            localStorage.setItem(itemName, JSON.stringify([{ 'id': id }]))
            localStorage.setItem('count', 1)

            setCount(Number(cartCount + 1))
        }
        else if (!localBeerData.includes(id)) {

            var beersId = JSON.parse(localBeerData)
            beersId.push({ 'id': id })

            localStorage.setItem(itemName, JSON.stringify(beersId));

            var temp = localCountData
            var addOne = ++temp
            localStorage.setItem('count', addOne)
            setCount(Number(cartCount + 1))

        } else {
            alert('This item is already in your cart')
        }
    };

    const getCartContent = () => {

        const localBeerData = localStorage.getItem(itemName);

        if (localBeerData === null) {
            return
        } else {

            var beerIdsArray = JSON.parse(localBeerData)
            var resetContent = []

            beerIdsArray.map(beer => {
                return (
                    axios.get('https://api.punkapi.com/v2/beers/' + beer.id)
                        .then(res => {
                            // This is something unusual but currently working
                            // Need to be improved
                            // Length is right but the array has always max size
                            resetContent.push(res.data[0])
                            if (beerIdsArray.length === resetContent.length) {
                                setContent(resetContent)
                            }
                        })
                )
            })
        }
    };

    const deleteFromCart = (beerId) => {

        const localBeerData = localStorage.getItem(itemName);
        const localCountData = localStorage.getItem('count');

        const beerData = JSON.parse(localBeerData)
        const filteredBeers = beerData.filter(item => item.id !== beerId)

        localStorage.setItem(itemName, JSON.stringify(filteredBeers))

        const filteredContent = cartContent.filter(item => item.id !== beerId)
        setContent(filteredContent)

        var temp = localCountData
        var subtractOne = --temp
        localStorage.setItem('count', subtractOne)
        setCount(Number(cartCount - 1))
    }


    return (
        <FunctionalContext.Provider value={{ getBeers, handleAdd, getCartContent, deleteFromCart }}>
            {props.children}
        </FunctionalContext.Provider>
    );
}

export default FunctionalContextProvider; 