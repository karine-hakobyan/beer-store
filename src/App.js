import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/HomeList';
import SingleBeer from './components/SingleBeer';
import ShoppingCart from './components/ShoppingCart';


class App extends Component {
    render() {
        return (
            <Router basname='/List'>
                <div className='App'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/shoppingcart' component={ShoppingCart} /> 
                        <Route path='/:beer_id' component={SingleBeer} /> 
                        
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;