/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import { connect } from 'react-redux';

import Header from './Header';
import CartIcon from './CartIcon';
import { subtractCartCount } from '../store/actions/cartCountAction';
import { cookieName } from '../App';


class ShoppingCart extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            addedBeers: ''
        };

        this.deleteFromCart = this.deleteFromCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.renderCartContent = this.renderCartContent.bind(this);
    }

    // Get a single beer  based on cookie value and store it in the state
    componentDidMount() {
        const { cookies } = this.props;
        if (cookies.get(cookieName) === undefined) {
            return this.state
        } else {

            let beerIdsArray = cookies.get(cookieName).split('-')

            beerIdsArray.pop(beerIdsArray.length - 1)

            for (let i of beerIdsArray) {
                axios.get('https://api.punkapi.com/v2/beers/' + i)
                    .then(res => {
                        let addedBeers = [...this.state.addedBeers, res.data[0]];
                        this.setState({ addedBeers })
                    })
            }
        }

    }

    // Algorithm for deleting item from shopping cart
    deleteFromCart(beer) {
        const { cookies } = this.props;

        var newString = cookies.get(cookieName).replace(beer + '-', '')

        cookies.set(cookieName, newString, { path: '/' })

        var addedBeers = [...this.state.addedBeers]
        for (let i in addedBeers) {
            if (addedBeers[i].id === beer) {
                addedBeers.splice(i, 1)
            }
        }
        this.setState({ addedBeers })
        this.props.subtractCartCount()
    }


    // Go back to Home page
    handleClick(e) {
        e.preventDefault();
        this.props.history.push('./');
    }

    renderCartContent() {
        const { addedBeers } = this.state;

        const cartContent = addedBeers.length ? (
            addedBeers.map(beer => {
                return (
                    <div className='cart-item' key={beer.id}>
                        <img src={beer.image_url} alt="Beer" />
                        <div className='cart-item-details'>
                            <h4>{beer.name}</h4>
                            <p>First brewed in {beer.first_brewed}</p>
                        </div>
                        <button className='remove-item' onClick={() => this.deleteFromCart(beer.id)}>Delete item from cart</button>
                    </div>
                )
            })
        ) : (
                <div className="center">Your cart is empty!</div>
            )
        return cartContent
    }


    render() {
        return (
            <div>
                <Header />
                <CartIcon />
                <div>
                    <button className='go-home-button' onClick={this.handleClick}>Go Home!</button>
                    <h2>Your Cart</h2>
                </div>
                <div className='cart-container'>
                    {this.renderCartContent()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        subtractCartCount: () => dispatch(subtractCartCount())
    }
}

export default connect(null, mapDispatchToProps)(withCookies(ShoppingCart));