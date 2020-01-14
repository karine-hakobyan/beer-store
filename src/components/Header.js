/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React from 'react';
import beer from '../assets/images/beer.jpeg';

const Header = () => {
    return (
        <div>
            <div className="header-image">
                <img src={beer} alt='beer' />
            </div>
            <div className='header-text'>
                <h5>Welcome to our</h5>
                <h1>BEER SHOP</h1>
            </div>
        </div>
    )
}

export default Header;