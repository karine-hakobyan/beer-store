import React, { Component } from 'react';
import basket from './basket.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CartIcon extends Component {
    render() {
        return (
                <Link to={'/shoppingcart'} className='cart-icon'>
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