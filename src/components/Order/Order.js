import React, { Component } from "react";
import OrderContext from "../../context/OrderContext";
import OrderList from "../OrderList/OrderList";
import { BTC_USD, XRP_USD } from "../../utils/constants";
import {
  connectSocket,
  subscribe,
  unsubscribe
} from "../../services/api-service";
const DATA_EVENT = "data";
export default class Order extends Component {
  static contextType = OrderContext;

  constructor() {
    super();
    this.state = {
      book: "",
      error: null,
      currencies: [
        { value: BTC_USD.value, option: BTC_USD.option },
        { value: XRP_USD.value, option: XRP_USD.option }
      ],
      ordersData: null
    };
  }

  componentDidMount() {
    this.setState({
      book: "",
      error: null
    });
    connectSocket(this.onMessageHandler);
  }

  onMessageHandler = ev => {
    const { event, data } = ev && ev.data ? JSON.parse(ev.data) : {};
    if (event === DATA_EVENT) {
      this.setState({
        ordersData: data
      });
    }
  };

  handleOnChange = e => {
    const currencyPairSubscribe = e.target.value;
    const currencyPairUnsubscribe = this.state.book;
    if (currencyPairUnsubscribe) {
      unsubscribe(currencyPairUnsubscribe);
    }
    console.log("currencyPairSubscribe: ", currencyPairSubscribe);
    if (currencyPairSubscribe !== "Select currency") {
      subscribe(currencyPairSubscribe);
    }
    this.setState({ book: currencyPairSubscribe }); // make sure subscribe is successful before updating state
  };

  render() {
    const { ordersData } = this.state;
    const options = this.state.currencies.map((option, idx) => (
      <option key={idx} value={option.value.toLowerCase()}>
        {option.option}
      </option>
    ));

    return (
      <>
        <h1>Order Book!</h1>
        <div className="order">
          {this.context.error !== null && (
            <div className="alert-error">{this.context.errors}</div>
          )}
          <select className="select-currency" onChange={this.handleOnChange}>
            <option defaultValue="">Select currency</option>
            {options}
          </select>
          <div className="list">
            <OrderList ordersData={ordersData} />
          </div>
        </div>
      </>
    );
  }
}
