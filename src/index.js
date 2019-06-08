import React from 'react';
import ReactDOM from 'react-dom';
import { OrderProvider } from './context/OrderContext'
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
    <OrderProvider>
        <App />
    </OrderProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
