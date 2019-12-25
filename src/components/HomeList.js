import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Header';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import {addCartCount} from '../store/actions/cartCountAction';
import CartIcon from './CartIcon'

class Home extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    argument = 'https://api.punkapi.com/v2/beers?per_page=9&page='

    constructor() {
        super();
        this.state = {
            beers: [],
            activePage: 1,
            search: "",
            totalBeers: 90,  //TODO: Get total number of beers from Punk API,
        }

        this.getBeers = this.getBeers.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.filterBeers = this.filterBeers.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }



    getBeers(parameter) {
        axios.get(this.argument + parameter)
            .then(res => {
                this.setState({
                    beers: res.data
                })
            })
    }

    componentDidMount() {
        this.getBeers(this.state.activePage)
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber
        })
        this.getBeers(pageNumber)
    }

    filterBeers(e) {
        let urlParams = this.state.activePage + '&beer_name=' + e
        this.getBeers(urlParams)
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value,
        })
        this.filterBeers(event.target.value)
    }

    handleAdd(id) {
        const { cookies } = this.props;
        let key = 'id-' + id
        cookies.set(key, id, { path: '/' });
        this.props.addCartCount();
    }


    render() {
        // console.log(this.props.addCartCount)
        const { beers } = this.state;

        const beerList = beers.length ? (
            beers.map(beer => {
                return (
                    <div className="each-beer" key={beer.id}>
                        <Link to={'/' + beer.id} >
                            <img src={beer.image_url} alt="Beer" />
                            <p className="name">{beer.name}</p>
                        </Link>
                        <button className='add-cart-button' onClick={() => this.handleAdd(beer.id)}>Add to cart</button>
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
                <div className="input-field">
                    <p>Search for beer</p>
                    <input type="text" value={this.state.search} onChange={this.updateSearch} />
                </div>
                <div className="flex-container">
                    {beerList}
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

export default connect(null, mapDispatchToProps)(withCookies(Home));