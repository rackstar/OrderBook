import React, { Component } from 'react';

const OrderContext = React.createContext({
  data: []
});

export default OrderContext;

export class OrderProvider extends Component {
    state = {
        data: []
    }
    
    
    render() {
        const value = {
            data: this.state.data
        };

        return (
        <OrderContext.Provider value={value}>
            {this.props.children}
        </OrderContext.Provider>
        );
    }
}