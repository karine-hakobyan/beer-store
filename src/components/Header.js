import React from 'react';
import image from './image.jpeg'

const Header = () => {
    return (
        <div>
            <div className="header-image">
                <img src={image} alt='beer' />
            </div>
            <div className='header-text'>
                <h5>Welcome to our</h5>
                <h1>BEER SHOP</h1>
            </div>
        </div>
    )
}

export default Header;