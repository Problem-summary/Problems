import React from 'react';
 render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.js';
import configureStore from 'STORE/init.js'
const store = configureStore();
render(
<Provider store={store}>
    <App/>
    </Provider>,
    document.querySelector('#wrap')
);