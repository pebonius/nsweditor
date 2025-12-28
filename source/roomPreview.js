import { isColor } from "./utilities.js";

export default class RoomPreview {
  #defaultFont = "Arial";
  #defaultBackgroundColor = "cornflowerblue";
  #defaultTextColor = "white";
  #defaultDescription = "not defined";
  #defaultExitLabel = "not defined";

  constructor(rooms) {
    this.currentRoomId = 0;
    this.rooms = rooms;
  }

  get defaultFont() {
    return this.#defaultFont;
  }
  get defaultBackgroundColor() {
    return this.#defaultBackgroundColor;
  }
  get defaultTextColor() {
    return this.#defaultTextColor;
  }
  get defaultDescription() {
    return this.#defaultDescription;
  }
  get defaultExitLabel() {
    return this.#defaultExitLabel;
  }
  get directions() {
    return {
      n: "north",
      s: "south",
      w: "west",
      e: "east",
    };
  }
  get allDirections() {
    return [
      this.directions.n,
      this.directions.s,
      this.directions.w,
      this.directions.e,
    ];
  }
  get currentRoom() {
    return this.rooms.find((room) => room.id === this.currentRoomId);
  }
  get currentTextColor() {
    const roomTextColor = this.currentRoom.textColor;

    if (roomTextColor === undefined) {
      return this.defaultTextColor;
    }

    if (!isColor(roomTextColor)) {
      Debug.log(
        `room ${this.currentRoomId}: \'${roomTextColor}\' is not a valid textColor`
      );
      return this.defaultTextColor;
    }

    return roomTextColor;
  }
  get currentBackgroundColor() {
    const roomBackgroundColor = this.currentRoom.backgroundColor;

    if (roomBackgroundColor === undefined) {
      return this.defaultBackgroundColor;
    }

    if (!isColor(roomBackgroundColor)) {
      Debug.log(
        `room ${this.currentRoomId}: \'${roomBackgroundColor}\' is not a valid backgroundColor`
      );
      return this.defaultBackgroundColor;
    }

    return roomBackgroundColor;
  }
  get currentDescription() {
    const roomDescription = this.currentRoom.description;

    if (roomDescription === undefined) {
      Debug.log(`room ${this.currentRoomId}: no room description found`);
      return this.defaultDescription;
    }

    return roomDescription;
  }
  get currentFont() {
    const roomFont = this.currentRoom.font;

    if (roomFont === undefined) {
      return this.defaultFont;
    }

    return roomFont;
  }
  getExitButton(direction) {
    return document.querySelector(`#${direction}-exit-button`);
  }
  getExitLabel(direction) {
    const label = this.currentRoom[direction].label;

    if (label === "") {
      return label;
    }

    return label ? label : this.defaultExitLabel;
  }

  displayCurrentRoom() {
    if (!this.currentRoom) {
      throw new Error(
        `room with id \'${this.currentRoomId}\' was not defined in data.json`
      );
    }

    this.setColors();
    this.setFont();
    this.displayRoomDescription();
    this.allDirections.forEach((direction) => {
      this.displayExit(direction);
    });
  }

  setColors() {
    const gameContainer = document.querySelector("#room-preview");

    gameContainer.style.backgroundColor = this.currentBackgroundColor;
    gameContainer.style.color = this.currentTextColor;
  }

  setFont() {
    const gameContainer = document.querySelector("#room-preview");

    gameContainer.style.fontFamily = this.currentFont;
  }

  displayRoomDescription() {
    const roomDescriptionDiv = document.querySelector("#room-description");
    const description = this.currentDescription;

    if (Array.isArray(description)) {
      this.displayDescriptionArray(roomDescriptionDiv, description);
    } else if (typeof description === "string") {
      this.displayDescriptionString(roomDescriptionDiv, description);
    }
  }

  displayDescriptionString(roomDescriptionDiv, description) {
    roomDescriptionDiv.style.whiteSpace = "normal";
    roomDescriptionDiv.textContent = description;
  }

  displayDescriptionArray(roomDescriptionDiv, description) {
    const htmlContent = description.join("<br>");
    roomDescriptionDiv.style.whiteSpace = "preserve nowrap";
    roomDescriptionDiv.innerHTML = htmlContent;
  }

  displayExit(direction) {
    const exitButton = this.getExitButton(direction);

    if (!this.currentRoom[direction]) {
      exitButton.style.display = "none";
      return;
    }

    exitButton.style.display = "block";
    exitButton.textContent = this.getExitLabel(direction);
  }
}
