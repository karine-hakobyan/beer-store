/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { Component } from 'react';
import axios from 'axios';

import { backendRootUrl } from '../App';
import Header from './Header';
import CartIcon from './CartIcon';


class SingleBeer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: null,
        }

        this.handleClick = this.handleClick.bind(this);
        this.renderSingleBeer = this.renderSingleBeer.bind(this);
    }


    // Get a single beer 
    componentDidMount() {
        let id = this.props.match.params.beer_id
        axios.get(backendRootUrl + '/' + id)
            .then(res => {
                this.setState({
                    beer: res.data[0]
                })
            })
    }

    // Go back to Home page
    handleClick(e) {
        e.preventDefault();
        this.props.history.push('./');
    }

    renderSingleBeer() {
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
                <div className='center'>Loading beer...</div>
            )
        return beer
    }


    render() {
        this.renderSingleBeer();
        return (
            <div>
                <Header />
                <CartIcon />
                {this.renderSingleBeer()};
                <button className='go-back-button' onClick={this.handleClick}>Go Home!</button>
            </div>
        )
    }
}



export default SingleBeer;