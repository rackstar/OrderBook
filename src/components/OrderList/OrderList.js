import React from "react";

const BuyOrder = ({ ordersData }) => {
  if (ordersData) {
    const market = ordersData.bids.map((bid, index) => (
      <tr key={index}>
        <td>{bid.join(" @ ")}</td>
        <td>{ordersData.asks[index].join("@")}</td>
      </tr>
    ));

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
