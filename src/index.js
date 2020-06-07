import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './views/App';
import { configureStore } from './state/store';
import { Provider } from 'react-redux';

const store = configureStore()

document.querySelector('body').addEventListener("contextmenu", e => e.preventDefault())

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);