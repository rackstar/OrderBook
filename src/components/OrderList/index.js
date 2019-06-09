import React from "react";
import { getCurrency } from "../../utils/currency";
import { getCoin } from "../../utils/coin";

const BuyOrder = ({ ordersData, currencyPair }) => {
  if (ordersData) {
    const { bids, asks } = ordersData;

    const coin = getCoin(currencyPair);
    const currency = getCurrency(currencyPair);

    const market = bids.map(([bidCoinAmount, bidPrice], index) => {
      const [askCoinAmount, askPrice] = asks[index];
      const bid = `${bidCoinAmount} ${coin} @ ${bidPrice} ${currency}`;
      const ask = `${askCoinAmount} ${coin} @  ${askPrice} ${currency}`;
      return (
        <tr key={index}>
          <td>{bid}</td>
          <td>{ask}</td>
        </tr>
      );
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Bids</th>
            <th>Ask</th>
          </tr>
        </thead>
        <tbody>{market}</tbody>
      </table>
    );
  }
  return <div>Select orders</div>;
};

export default BuyOrder;
