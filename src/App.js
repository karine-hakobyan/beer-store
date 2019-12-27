/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeList from './components/HomeList';
import SingleBeer from './components/SingleBeer';
import ShoppingCart from './components/ShoppingCart';


export const backendRootUrl = 'https://api.punkapi.com/v2/beers'
export const backendSearchUrl = backendRootUrl + '?per_page=9&page='
export const cookieName = 'beerIdList'

class App extends Component {
    
    
    render() {
        return (
            <Router basname='/List'>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={HomeList} />
                        <Route path='/shoppingcart' component={ShoppingCart} /> 
                        <Route path='/:beer_id' component={SingleBeer} /> 
                        
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;