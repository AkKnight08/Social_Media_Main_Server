import { io } from "socket.io-client.js";
console.log("Connect to Chat");
const joinRoomButton = document.getElementById("room-button");
const messageInput = document.getElementById("message-input");
const roomInput = document.getElementById("room-input");
const form = document.getElementById("form");

const socket = io("http://localhost:3000");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  if (message === "") return;
  displaymessage(message);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", (e) => {
  const room = roomInput.value;
});

function displaymessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.getElementById("message-container").append(div);
}
