/* Project Name: Beer-store,
    Author: Karine Hakobyan,
    Date: 27.12.2019  */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { CookiesProvider } from 'react-cookie';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer'


const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <CookiesProvider>
            <App />
        </CookiesProvider>
    </Provider>,
    document.getElementById('root'));


