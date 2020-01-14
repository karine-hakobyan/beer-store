/* Project Name: Beer-store,
   Author: Karine Hakobyan,
   Date: 27.12.2019  */

import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from './Header';
import CartIcon from './CartIcon';
import { BeerDataContext } from '../contexts/BeerDataContext';
import { FunctionalContext } from '../contexts/FunctionalContext';


const HomeList = () => {

    const { beers } = useContext(BeerDataContext);
    const { getBeers, handleAdd } = useContext(FunctionalContext)

    const [search, setSearch] = useState("");
    const [activePage, setPage] = useState(1);


    useEffect(() => {
        getBeers(activePage);
    }, [activePage]);

    useEffect(() => {
        if (search.trim() === "") {
          getBeers(activePage);
        }
      }, [search]);
    

    const handlePageChange = pageNumber => {
        setPage(pageNumber);
    };

    const filterBeers = e => {
        if (e !== "") {
            getBeers(`1&beer_name=${e}`);
        } else {
            setPage(activePage);
        }
    };

    const updateSearch = event => {
        setSearch(event.target.value);
        filterBeers(event.target.value);
    };



    return (
        <div>
            <Header />
            <CartIcon />
            <div className="input-field">
                <p>Search for beer</p>
                <input type="text" value={search} onChange={updateSearch} />
            </div>
            <div className="flex-container">
                {beers.length ? (
                    beers.map(beer => {
                        return (
                            <div className="each-beer" key={beer.id}>
                                <Link to={"/" + beer.id}>
                                    <img src={beer.image_url} alt="Beer" />
                                    <p className="beer-name">{beer.name}</p>
                                </Link>
                                <button
                                    className="add-cart-button"
                                    onClick={() => handleAdd(beer.id)}
                                >
                                    {"Add to cart"}
                                </button>
                            </div>
                        );
                    })
                ) : (
                        <div className="center">{"No result"}</div>
                    )}
            </div>
            <div className="pagination">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={9}
                    totalItemsCount={90}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                />
            </div>
        </div>
    );
};



export default HomeList;