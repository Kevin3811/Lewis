import { Client } from "@stomp/stompjs";
import store from "../store";

const url = "ws://localhost:8081/scores";

let client;
let subscription;

function createConnection() {
  client = new Client({
    brokerURL: url,
    reconnectDelay: 5000,
  });
  //Subscribe to stomp topics when connection is established
  client.onConnect = () => {
    subscribe();
  };
  //Unsubscribe to stomp topics when connection is disconnected
  client.onDisconnect = () => {
    unsubscribe();
    console.log("disconnected from websocket");
  };

  client.onStompError = function(frame) {
    console.error("Error connecting to broker: ", frame);
  };
  client.activate();
}

function subscribe() {
  if (client) {
    client.subscribe("/topic/scores", (message) => {
      store.dispatch("updateScores", message.body);
    });
    console.log("Websocket subsribed to topics");
  }
}

function unsubscribe() {
  if (!subscription) {
    subscription.unsubscribe();
  }
}

export default {
  createConnection,
};
