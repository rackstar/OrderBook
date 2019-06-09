import React from "react";

const BuyOrder = ({ ordersData }) => {
  console.log(ordersData);

  if (ordersData) {
    const bids = ordersData.bids.map(bid => bid.join("@"));
    const asks = ordersData.asks.map(ask => (
      <tr>
        <td>{ask.join("@")}</td>
      </tr>
    ));

    return (
      <table>
        <thead>
          <tr>
            <th> Bids </th>
            <th> Ask </th>
          </tr>
        </thead>
        <tbody>{asks}</tbody>
      </table>
    );
  }
  return <div>Select orders</div>;
};
export default BuyOrder;
