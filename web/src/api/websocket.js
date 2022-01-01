import { Client } from "@stomp/stompjs";
import store from "../store";

const url = "ws://localhost:8081/scores";

let client;
let subscription;

function createConnection(lobbyCode) {
  client = new Client({
    brokerURL: url,
    reconnectDelay: 5000,
  });
  //Subscribe to stomp topics when connection is established
  client.onConnect = () => {
    subscribe(lobbyCode);
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

function subscribe(lobbyCode) {
  if (client) {
    client.subscribe("/topic/scores/" + lobbyCode, (message) => {
      store.dispatch("updateScores", message.body);
    });
    console.log("Websocket subsribed to topics for lobby: ", lobbyCode);
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
