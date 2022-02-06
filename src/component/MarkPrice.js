
  import React, { useEffect, useState } from "react";

  const  MarkPrice = () => {
    const [bids, setBids] = useState([]);
  
    const ws = new WebSocket("wss://production-esocket.delta.exchange");
  
    const apiCall ={
      "type": "subscribe",
      "payload": {
          "channels": [{"name": "v2/ticker", "symbols": ["BTCUSD", "BTCUSDT"]}]
      }
  }
   useEffect(() => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
    
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = "data")) {
          console.log(json.mark_price)
          setBids(json.mark_price);
        }
      } catch (err) {
        console.log(err);
      }
    };
   })
  
    return <div>{bids}</div>;
  }
  
  export default  MarkPrice;