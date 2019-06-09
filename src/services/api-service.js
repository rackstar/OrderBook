const BIT_STAMP_WS_URL = "wss://ws.bitstamp.net";
const BTS_SUBSCRIBE_EVENT = "bts:subscribe";
const BTC_UNSUBSCRIBE_EVENT = "bts:unsubscribe";

let ws;

const connectedHandler = () =>
  console.log(`Websocket connection established with ${BIT_STAMP_WS_URL}`);
const errorHandler = e => console.error("connection error", e);
const connectionCloseHandler = () => console.log("connection closed");

const getSubscribePayload = currencyPair => {
  const subscribePayload = {
    event: BTS_SUBSCRIBE_EVENT,
    data: {
      channel: `order_book_${currencyPair}`
    }
  };
  return JSON.stringify(subscribePayload);
};

const getUnsubscribePayload = currencyPair => {
  const subscribePayload = {
    event: BTC_UNSUBSCRIBE_EVENT,
    data: {
      channel: `order_book_${currencyPair}`
    }
  };
  return JSON.stringify(subscribePayload);
};

export const subscribe = currencyPair => {
  console.log(`Subscribing to currencyPair: ${currencyPair}`);
  const subscribePayload = getSubscribePayload(currencyPair);
  if (!ws) {
    console.error(
      `No websocket connection found! Please call connectSocket() first`
    );
    return;
  }
  ws.send(subscribePayload);
};

export const unsubscribe = currencyPair => {
  console.log(`Unsubscribing to currencyPair: ${currencyPair}`);
  const unsubscribePayload = getUnsubscribePayload(currencyPair);
  if (!ws) {
    console.error(
      `No websocket connection found! Please call connectSocket() first`
    );
    return;
  }
  ws.send(unsubscribePayload);
};

export const connectSocket = onMessageHandler => {
  ws = new WebSocket(BIT_STAMP_WS_URL);
  // Set up event actions
  ws.onopen = connectedHandler;
  ws.onmessage = onMessageHandler;
  ws.onerror = errorHandler;
  ws.onclose = connectionCloseHandler;
};
