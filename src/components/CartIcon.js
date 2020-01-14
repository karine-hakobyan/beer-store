/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import basket from '../assets/images/basket.jpg';
import { BeerDataContext } from '../contexts/BeerDataContext';

export const CartIcon = () => {

    const { cartCount } = useContext(BeerDataContext)
    return (
        <Link to="/shoppingcart" className="cart-icon">
            <img src={basket} alt="basket" />
            <p>{cartCount}</p>
        </Link>
    );
};

export default CartIcon