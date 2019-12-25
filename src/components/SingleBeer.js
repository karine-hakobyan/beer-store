import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import CartIcon from './CartIcon'


class SingleBeer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: null,
        }

        this.handleClick = this.handleClick.bind(this);
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
                <CartIcon />
                {beer}
                <button className='go-back-button' onClick={this.handleClick}>Go Home!</button>
            </div>
        )
    }
}



export default SingleBeer;