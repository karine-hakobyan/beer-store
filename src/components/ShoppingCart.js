/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { useEffect, useContext} from 'react';
import Header from './Header';
import CartIcon from './CartIcon';
import { FunctionalContext } from '../contexts/FunctionalContext';
import { BeerDataContext } from '../contexts/BeerDataContext';


const ShoppingCart = (props) => {

    const {getCartContent, deleteFromCart } = useContext(FunctionalContext)
    const {cartContent} = useContext(BeerDataContext)

    useEffect(() => {
        getCartContent()
    }, [])


    const handleClick = e => {
        e.preventDefault();
        props.history.push('./');
    }

    const renderBeer = () => {
        const content = cartContent.length ? (
            cartContent.map(beer => {
                return (
                    <div className='cart-item' key={beer.id}>
                        <img src={beer.image_url} alt="Beer" />
                        <div className='cart-item-details'>
                            <h4>{beer.name}</h4>
                            <p>{'First brewed in'} {beer.first_brewed}</p>
                        </div>
                        <button className='remove-item' onClick={() => deleteFromCart(beer.id)}>{'Delete item from cart'}</button>
                    </div>
                )
            })
        ) : (
                <div className="center">{'Your cart is empty!'}</div>
            )
        return content
    }

    return (
        <div>
            <Header />
            <CartIcon />
            <div>
                <button className='go-home-button' onClick={handleClick}>Go Home!</button>
                <h2>Your Cart</h2>
            </div>
            <div className='cart-container'>
                {renderBeer()}
            </div>
        </div>
    );
}

export default ShoppingCart;
