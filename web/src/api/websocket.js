import { Client } from "@stomp/stompjs";
import store from "../store";

let client;

let scoreSub;
let playerSub;
let gameSub;
let roundSub;

function createConnection(lobbyCode) {
  client = new Client({
    brokerURL: process.env.VUE_APP_WS_URL,
    reconnectDelay: 5000,
  });
  //Subscribe to stomp topics when connection is established
  client.onConnect = () => {
    console.log("Connected to websocket");
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
    //Updating scores
    scoreSub = client.subscribe("/topic/scores/" + lobbyCode, (message) => {
      store.dispatch("updateScores", message.body);
    });
    //Updating players in lobby
    playerSub = client.subscribe("/topic/players/" + lobbyCode, (message) => {
      store.dispatch("setUsers", JSON.parse(message.body));
    });
    //Update game rules
    gameSub = client.subscribe("/topic/game/" + lobbyCode, (message) => {
      store.dispatch("setGameRules", JSON.parse(message.body));
    });
    //Update round
    roundSub = client.subscribe("/topic/round/" + lobbyCode, (message) => {
      console.log("next round: ", JSON.parse(message.body));
      store.dispatch("nextRound");
    });
    console.log("Websocket subsribed to topics for lobby: ", lobbyCode);
  }
}

function unsubscribe() {
  scoreSub.unsubscribe();
  playerSub.unsubscribe();
  gameSub.unsubscribe();
  roundSub.unsubscribe();
  console.log("Websocket unsubscribed");
}

export default {
  createConnection,
  unsubscribe,
};
