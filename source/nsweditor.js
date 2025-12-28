import RoomPreview from "./roomPreview.js";

const rooms = [];
const roomPreview = new RoomPreview(rooms);

const startingRoom = {
  id: 0,
  textColor: "linen",
  backgroundColor: "darkgoldenrod",
  description: "last night i had a dream about coding a game engine",
  north: {
    label: "really?",
    linkTo: 1,
  },
};

// UI elements
const roomList = document.querySelector("#room-list");
const addRoomButton = document.querySelector("#add-room-button");
const roomDescription = document.querySelector("#room-description");
const northExitButton = document.querySelector("#north-exit-button");
const southExitButton = document.querySelector("#south-exit-button");
const westExitButton = document.querySelector("#west-exit-button");
const eastExitButton = document.querySelector("#east-exit-button");
const jsonCodeArea = document.querySelector("#json-code");
const roomIdInput = document.querySelector("#room-id-input");
const roomTextColorInput = document.querySelector("#room-textcolor-input");
const roomBackgroundColorInput = document.querySelector(
  "#room-backgroundcolor-input"
);
const roomDescriptionInput = document.querySelector("#room-description-input");
const northExitCheckbox = document.querySelector("#north-exit-checkbox");
const southExitCheckbox = document.querySelector("#south-exit-checkbox");
const westExitCheckbox = document.querySelector("#west-exit-checkbox");
const eastExitCheckbox = document.querySelector("#east-exit-checkbox");
const northExitLabelInput = document.querySelector("#north-exit-label-input");
const southExitLabelInput = document.querySelector("#south-exit-label-input");
const westExitLabelInput = document.querySelector("#west-exit-label-input");
const eastExitLabelInput = document.querySelector("#east-exit-label-input");
const northExitLinktoSelect = document.querySelector(
  "#north-exit-linkto-select"
);
const southExitLinktoSelect = document.querySelector(
  "#south-exit-linkto-select"
);
const westExitLinktoSelect = document.querySelector("#west-exit-linkto-select");
const eastExitLinktoSelect = document.querySelector("#east-exit-linkto-select");

function displayJson() {
  const json = JSON.stringify(rooms, undefined, 4);
  jsonCodeArea.textContent = json;
}

function updateUI() {
  displayJson();
}

function initialize() {
  rooms.push(startingRoom);
  updateUI();
  roomPreview.displayCurrentRoom();
}

initialize();
