/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import basket from './images/basket.jpg';

class CartIcon extends Component {
    render() {
        return (
                <Link to='/shoppingcart' className='cart-icon'>
                    <img src={basket} alt='basket' />
                    <p>{this.props.count}</p>
                </Link>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}

export default connect(mapStateToProps)(CartIcon);