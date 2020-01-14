/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { backendRootUrl } from '../App';
import Header from './Header';
import CartIcon from './CartIcon';

const SingleBeer = (props) => {

    const [beer, setBeer] = useState(null)

    useEffect(() => {
        let id = props.match.params.beer_id
        axios.get(`${backendRootUrl}/${id}`)
            .then(res => {
                setBeer(res.data[0])
            })
    }, [props.match.params.beer_id])

    const handleClick = e => {
        e.preventDefault();
        props.history.push('./');
    }

    return (
        <div>
            <Header />
            <CartIcon />
            {beer ? (
                <div className="container">
                    <img src={beer.image_url} alt="beer" />
                    <div className="beer-details">
                        <h1>{beer.name}</h1>
                        <p>First brewed in {beer.first_brewed}</p>
                        <p>{beer.description}</p>
                    </div>
                </div>
            ) : (
                    <div className='center'>Loading beer...</div>
                )};
                <button className='go-back-button' onClick={handleClick}>Go Home!</button>
        </div>
    );
}

export default SingleBeer;
