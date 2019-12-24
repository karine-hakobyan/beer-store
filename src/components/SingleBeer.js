import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies}  from 'react-cookie';

class SingleBeer extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            beer: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {
        let id = this.props.match.params.beer_id
        axios.get('https://api.punkapi.com/v2/beers/' + id)
            .then(res => {
                this.setState({
                    beer: res.data[0]
                })
            })
    }

    handleClick(e) {
        e.preventDefault();
        this.props.history.push('./');
    }

    handleAdd() {
        const { cookies } = this.props;
        let key = 'id-' + this.state.beer.id
        cookies.set(key, this.state.beer.id, { path: '/' });
        // cookies.remove('smuuid')
        console.log(cookies.cookies)
    }

    render() {
        const beer = this.state.beer ? (
            <div className="container">
                <img src={this.state.beer.image_url} alt="beer" />
                <div className="beer-details">
                    <h1>{this.state.beer.name}</h1>
                    <p>First brewed in {this.state.beer.first_brewed}</p>
                    <p>{this.state.beer.description}</p>
                </div>
            </div>
        ) : (
                <div>Loading beer...</div>
            )
        return (
            <div>
                <Header />
                <Link to={'/shoppingcart'}>Your cart</Link>
                {beer}
                <button className='add-cart' onClick={this.handleAdd}>Add to cart</button>
                <button className='go-home' onClick={this.handleClick}>Go Home!</button>
            </div>
        )
    }
}

export default withCookies(SingleBeer);