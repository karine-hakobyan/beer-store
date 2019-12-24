import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios';
import Header from './Header';

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
    }

    componentDidMount() {
        // console.log(this.props.cookies)
        var cookiesValuesArray = Object.values(this.props.cookies.cookies)
        // console.log(cookiesValuesArray)

        for (let i of cookiesValuesArray) {
            axios.get('https://api.punkapi.com/v2/beers/' + i)
                .then(res => {
                    // console.log(res.data[0])
                    let addedBeers = [...this.state.addedBeers, res.data[0]];
                    console.log(addedBeers)
                    this.setState({
                        addedBeers
                    })
                })
        }

    }

    deleteFromCart(beer) {
        this.props.cookies.remove(beer)
        // console.log(this.props.cookies.cookies)
        // console.log(this.props.cookies.getAll())
        // this.setState({addedBeers: this.props.cookies.getAll()})
var addedBeers = [...this.state.addedBeers]
        for (let i in addedBeers) {
            // console.log(this.state.addedBeers[i].id)
            if (addedBeers[i].id === Number(beer.slice(3))) {
                      addedBeers.splice(i, 1)
                      console.log(addedBeers)
            }
        }
        this.setState({addedBeers})
    }

    render() {
        const { addedBeers } = this.state;
        // console.log(this.state.addedBeers)

        const cartContent = addedBeers.length ? (
            addedBeers.map(beer => {
                return (
                    <div className='cart-beer' key={beer.id}>
                        <img src={beer.image_url} alt="Beer" />
                        <div className='cart-beer-details'>
                            <h3>{beer.name}</h3>
                            <p>First brewed in {beer.first_brewed}</p>
                        </div>
                        <button className='delete-button' onClick={() => this.deleteFromCart('id-' + beer.id)}>Delete item from cart</button>
                    </div>
                )
            })
        ) : (
                <div className="center">No beers yet!</div>
            )

        return (
            <div>
                <Header />
                <h2>Your Cart</h2>
                <div className='cart-container'>
                    {cartContent}
                </div>
            </div>
        )
    }
}

export default withCookies(ShoppingCart);