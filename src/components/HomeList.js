 /* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import { backendSearchUrl } from '../App';
import { cookieName } from '../App';
import Header from './Header';
import CartIcon from './CartIcon';
import { addCartCount } from '../store/actions/cartCountAction';


class HomeList extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };


    constructor() {
        super();

        this.state = {
            beers: [],
            activePage: 1,
            search: "",
            totalBeers: 90, 
        }

        this.getBeers = this.getBeers.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.filterBeers = this.filterBeers.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.renderBeerList = this.renderBeerList.bind(this)
    }



    getBeers(pageNumber) {
        axios.get(backendSearchUrl + pageNumber)
            .then(res => {
                this.setState({
                    beers: res.data
                })
            })
    }

    // Get beers of current page when component is rendered. 
    componentDidMount() {
        this.getBeers(this.state.activePage)
    }

    // Change page and get beers of that page
    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        })
        this.getBeers(pageNumber)
    }

    // Filter beers according to search input value
    filterBeers(e) {
        if(e !== ''){
            let filteredString = '&beer_name=' + e
            this.getBeers(1 + filteredString)
        }else(
            this.getBeers(this.state.activePage)
        )    
    }

    // Update input field value and filter beers based on that value
    updateSearch(event) {
        this.setState({
            search: event.target.value,
        })
        this.filterBeers(event.target.value)
    }

    // Store selected beer id in cookie. 
    handleAdd(id) {
        const { cookies } = this.props;

        if (cookies.get(cookieName) === undefined) {
            cookies.set(cookieName, id + '-', { path: '/' })
            this.props.addCartCount();
        }
        else if (!cookies.get(cookieName).includes(id)) {

            var temp = cookies.get(cookieName)
            var beersIds = temp + id + '-'
            cookies.set(cookieName, beersIds, { path: '/' })

            this.props.addCartCount();
        }
    }

    renderBeerList() {
        const { beers } = this.state;

        const beerList = beers.length ? (
            beers.map(beer => {
                return (
                    <div className="each-beer" key={beer.id}>
                        <Link to={'/' + beer.id} >
                            <img src={beer.image_url} alt="Beer" />
                            <p className="beer-name">{beer.name}</p>
                        </Link>
                        <button className='add-cart-button' onClick={() => this.handleAdd(beer.id)}>Add to cart</button>
                    </div>
                )
            })
        ) : (
                <div className="center">No beers yet!</div>
            )
        return beerList
    }


    render() {
        return (
            <div>
                <Header />
                <CartIcon />
                <div className="input-field">
                    <p>Search for beer</p>
                    <input type="text" value={this.state.search} onChange={this.updateSearch} />
                </div>
                <div className="flex-container">
                    {this.renderBeerList()}
                </div>
                <div className="pagination">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={9}
                        totalItemsCount={this.state.totalBeers}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        addCartCount: () => dispatch(addCartCount())
    }
}

export default connect(null, mapDispatchToProps)(withCookies(HomeList));