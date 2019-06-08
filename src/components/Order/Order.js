import React, { Component } from 'react';
import OrderContext from '../../context/OrderContext'
import OrderList from '../OrderList/OrderList'


export default class Order extends Component {
    static contextType = OrderContext;

    constructor(){
        super()
        this.state = {
            book: '',
            error: null,
            currencies: [{value: "btcusd", option: "BTC/USD"}, {value: "xrpusd", option: "XRP/USD"}]
        }

    }
    
    ws = new WebSocket("wss://ws.bitstamp.net");

    componentDidMount(){
        this.setState({
            book: '',
            error: null
        })
    }

    handleOnChnge = (e) =>{
        const sub = e.target.value
        const unsub = this.state.book
        this.setState({book: sub})
        this.initWebsocket(sub, unsub);
    }

    
    initWebsocket = (sub, unsub) => {
        let subscribe = {
            "event": "bts:subscribe",
            "data": {
                "channel": `order_book_${this.state.sub}`
            }
        }

        // let unsubscribe = {
        //     "event": "bts:unsubscribe",
        //     "data": {
        //         "channel": `order_book_${this.state.unsub}`
        //     }
        // }

        // let ws = new WebSocket("wss://ws.bitstamp.net");

        this.ws.onopen = () => {
            this.ws.send(JSON.stringify(subscribe));
        };

        this.ws.onmessage = (ev) => {
            let response = JSON.parse(ev.data);
            if(response.event === 'data'){
                console.log(response.data)
            } else {
                this.initWebsocket()
            }
        };
 
        this.ws.onclose = () => {
            console.log('Websocket connection closed');
            this.initWebsocket();
        };
    }

    render(){
        const options = this.state.currencies.map((option, idx )=> {
                return <option key={idx} value={option.value.toLowerCase()}>{option.option}</option>
        })
        return (
            <>
              <h1>Order Book!</h1>
              <div className="order">
              {this.context.error !== null && <div className="alert-error">{this.context.errors}</div>}
                    <select className="select-currency" onChange={this.handleOnChnge}>
                        <option defaultValue="">Select currency</option>
                        {options}
                    </select>
                    <div className="list">
                        <OrderList />
                    </div>
                    
              </div>
            </>
        )
    }
}