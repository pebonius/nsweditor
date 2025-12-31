import RoomPreview from "./roomPreview.js";

export default class Nsweditor {
  #startingRooms = [
    {
      id: 0,
      textColor: "linen",
      backgroundColor: "darkgoldenrod",
      description: "last night i had a dream about coding a game engine",
      north: {
        label: "really?",
        linkTo: 1,
      },
    },
    {
      id: 1,
      textColor: "white",
      backgroundColor: "royalblue",
      description: "yes, really",
      south: {
        label: "ok",
        linkTo: 0,
      },
    },
  ];

  constructor() {
    this.rooms = [];
    this.roomPreview = new RoomPreview(this.rooms);
    this.rooms.push(...this.#startingRooms);
    this.currentRoomId = this.#startingRooms[0].id;

    // UI elements
    this.roomList = document.querySelector("#room-list");
    this.addRoomButton = document.querySelector("#add-room-button");
    this.roomDescription = document.querySelector("#room-description");
    this.northExitButton = document.querySelector("#north-exit-button");
    this.southExitButton = document.querySelector("#south-exit-button");
    this.westExitButton = document.querySelector("#west-exit-button");
    this.eastExitButton = document.querySelector("#east-exit-button");
    this.jsonCodeArea = document.querySelector("#json-code");
    this.roomIdInput = document.querySelector("#room-id-input");
    this.roomTextColorInput = document.querySelector("#room-textcolor-input");
    this.roomBackgroundColorInput = document.querySelector(
      "#room-backgroundcolor-input"
    );
    this.roomDescriptionInput = document.querySelector(
      "#room-description-input"
    );
    this.northExitCheckbox = document.querySelector("#north-exit-checkbox");
    this.southExitCheckbox = document.querySelector("#south-exit-checkbox");
    this.westExitCheckbox = document.querySelector("#west-exit-checkbox");
    this.eastExitCheckbox = document.querySelector("#east-exit-checkbox");
    this.northExitLabelInput = document.querySelector(
      "#north-exit-label-input"
    );
    this.southExitLabelInput = document.querySelector(
      "#south-exit-label-input"
    );
    this.westExitLabelInput = document.querySelector("#west-exit-label-input");
    this.eastExitLabelInput = document.querySelector("#east-exit-label-input");
    this.northExitLinktoSelect = document.querySelector(
      "#north-exit-linkto-select"
    );
    this.southExitLinktoSelect = document.querySelector(
      "#south-exit-linkto-select"
    );
    this.westExitLinktoSelect = document.querySelector(
      "#west-exit-linkto-select"
    );
    this.eastExitLinktoSelect = document.querySelector(
      "#east-exit-linkto-select"
    );
  }
  initialize() {
    this.updateUI();
  }
  updateUI() {
    this.displayJson();
    this.displayList();
    this.roomPreview.displayCurrentRoom();
  }
  displayJson() {
    const json = JSON.stringify(this.rooms, undefined, 4);
    this.jsonCodeArea.textContent = json;
  }
  displayList() {
    const newListChildren = [];

    this.rooms.forEach((room) => {
      const newLi = document.createElement("li");
      newLi.innerText = `${room.id}`;
      newLi.onclick = () => {
        this.selectRoom(room.id);
      };
      if (room.id === this.currentRoomId) {
        newLi.classList.add("selected");
      }
      newListChildren.push(newLi);
    });

    this.roomList.replaceChildren(...newListChildren);
  }
  selectRoom(id) {
    this.currentRoomId = id;
    this.roomPreview.currentRoomId = id;
    this.updateUI();
  }
}
