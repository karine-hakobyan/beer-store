import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import Header from './Header';
import CartIcon from './CartIcon';
import { connect } from 'react-redux';
import {subtractCartCount} from '../store/actions/cartCountAction';


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
    }

    componentDidMount() {
        // console.log(this.props.cookies)
        var cookiesValuesArray = Object.values(this.props.cookies.cookies)

        for (let i of cookiesValuesArray) {
            axios.get('https://api.punkapi.com/v2/beers/' + i)
                .then(res => {
                    let addedBeers = [...this.state.addedBeers, res.data[0]];
                    console.log(addedBeers)
                    this.setState({ addedBeers })
                })
        }
    }

    deleteFromCart(beer) {
        this.props.cookies.remove(beer)
        var addedBeers = [...this.state.addedBeers]
        for (let i in addedBeers) {
            if (addedBeers[i].id === Number(beer.slice(3))) {
                addedBeers.splice(i, 1)
                console.log(addedBeers)
            }
        }
        this.setState({ addedBeers })
        this.props.subtractCartCount()
    }


    handleClick(e) {
        e.preventDefault();
        this.props.history.push('./');
    }


    render() {
        const { addedBeers } = this.state;

        const cartContent = addedBeers.length ? (
            addedBeers.map(beer => {
                return (
                    <div className='cart-item' key={beer.id}>
                        <img src={beer.image_url} alt="Beer" />
                        <div className='cart-item-details'>
                            <h3>{beer.name}</h3>
                            <p>First brewed in {beer.first_brewed}</p>
                        </div>
                        <button className='remove-item' onClick={() => this.deleteFromCart('id-' + beer.id)}>Delete item from cart</button>
                    </div>
                )
            })
        ) : (
                <div className="center">No beers yet!</div>
            )

        return (
            <div>
                <Header />
                <CartIcon />
                <div>
                    <button className='go-home-button' onClick={this.handleClick}>Go Home!</button>
                    <h2>Your Cart</h2>
                </div>
                <div className='cart-container'>
                    {cartContent}
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