import RoomPreview from "./roomPreview.js";
import { stringContainsAlphanumericOnly } from "./utilities.js";

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
  get currentRoom() {
    return this.rooms.find((room) => room.id === this.currentRoomId);
  }
  get allRoomIds() {
    const allIds = [];

    this.rooms.forEach((room) => {
      allIds.push(room.id);
    });

    return allIds;
  }
  get newRoomId() {
    const numericalRoomIds = this.allRoomIds.filter((id) =>
      Number.isSafeInteger(id)
    );

    if (numericalRoomIds.length > 0) {
      return Math.max(...numericalRoomIds) + 1;
    }
    return 1;
  }
  get newRoom() {
    return {
      id: this.newRoomId,
      textColor: "white",
      backgroundColor: "royalblue",
      description: "new room",
    };
  }
  initialize() {
    this.addRoomButton.onclick = () => {
      this.addNewRoom();
    };
    this.roomIdInput.onchange = () => {
      const inputValue = this.roomIdInput.value;
      if (this.currentRoom.id !== inputValue) {
        this.changeCurrentRoomId(inputValue);
      }
    };

    this.updateUI();
  }
  updateUI() {
    this.displayJson();
    this.displayList();
    this.roomPreview.displayCurrentRoom();
    this.updatePropInputs();
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
  addNewRoom() {
    this.rooms.push(this.newRoom);
    this.updateUI();
  }
  updatePropInputs() {
    this.roomIdInput.value = this.currentRoom.id;
    this.roomTextColorInput.value = this.currentRoom.textColor;
    this.roomBackgroundColorInput.value = this.currentRoom.backgroundColor;
    this.roomDescriptionInput.value = this.currentRoom.description;
    this.northExitCheckbox.checked = this.currentRoom.north;
    this.southExitCheckbox.checked = this.currentRoom.south;
    this.westExitCheckbox.checked = this.currentRoom.west;
    this.eastExitCheckbox.checked = this.currentRoom.east;
    this.northExitLabelInput.value =
      this.currentRoom.north && this.currentRoom.north.label
        ? this.currentRoom.north.label
        : "";
    this.southExitLabelInput.value =
      this.currentRoom.south && this.currentRoom.south.label
        ? this.currentRoom.south.label
        : "";
    this.westExitLabelInput.value =
      this.currentRoom.west && this.currentRoom.west.label
        ? this.currentRoom.west.label
        : "";
    this.eastExitLabelInput.value =
      this.currentRoom.east && this.currentRoom.east.label
        ? this.currentRoom.east.label
        : "";
  }
  idIsTaken(value) {
    return this.allRoomIds.includes(value);
  }
  /**
   * checks if the provided value is a valid id. meaning - it's a string with only alphanumeric characters
   * and another room does not already have that id
   */
  isValidId(value) {
    if (this.idIsTaken(value)) {
      return false;
    }

    if (
      typeof value === "string" &&
      value !== "" &&
      stringContainsAlphanumericOnly(value)
    ) {
      return true;
    }

    return false;
  }
  /**
   * changes the id of the current room to provided value, if value is a valid id.
   * ACHTUNG: purposefully does not work for room with id = 0 (starting room for the game)
   *
   * @param   value  new id
   */
  changeCurrentRoomId(value) {
    // TODO: this should also update linkTo values for all exits that point to the current room

    if (this.isValidId(value) && this.currentRoomId !== 0) {
      this.currentRoom.id = `${value}`;
      this.currentRoomId = `${value}`;
      this.selectRoom(`${value}`);
    } else {
      this.roomIdInput.value = `${this.currentRoomId}`;
    }
  }
}
