import RoomPreview from "./roomPreview.js";
import { isColor, stringContainsAlphanumericOnly } from "./utilities.js";

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
    this.propsTopBarTitle = document.querySelector("#room-props-top-bar-title");
    this.roomDeleteButton = document.querySelector("#room-delete-button");
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
  initialize() {
    // add room button
    this.addRoomButton.onclick = () => {
      this.addNewRoom();
    };

    // delete room button
    this.roomDeleteButton.onclick = () => {
      this.deleteCurrentRoom();
    };

    // room prop inputs
    this.roomIdInput.onchange = () => {
      const inputValue = this.roomIdInput.value;
      if (this.currentRoom.id !== inputValue) {
        this.changeCurrentRoomId(inputValue);
      }
    };

    this.roomTextColorInput.onchange = () => {
      const inputValue = this.roomTextColorInput.value;
      this.changeCurrentRoomTextColor(inputValue);
    };

    this.roomBackgroundColorInput.onchange = () => {
      const inputValue = this.roomBackgroundColorInput.value;
      this.changeCurrentRoomBackgroundColor(inputValue);
    };

    this.roomDescriptionInput.onchange = () => {
      const inputValue = this.roomDescriptionInput.value;
      this.changeCurrentRoomDescription(inputValue);
    };

    // exit checkboxes
    this.northExitCheckbox.onchange = () => {
      this.enableDisableExit(this.directions.n, this.northExitCheckbox.checked);
    };
    this.southExitCheckbox.onchange = () => {
      this.enableDisableExit(this.directions.s, this.southExitCheckbox.checked);
    };
    this.westExitCheckbox.onchange = () => {
      this.enableDisableExit(this.directions.w, this.westExitCheckbox.checked);
    };
    this.eastExitCheckbox.onchange = () => {
      this.enableDisableExit(this.directions.e, this.eastExitCheckbox.checked);
    };

    // exit label inputs
    this.northExitLabelInput.onchange = () => {
      const inputValue = this.northExitLabelInput.value;
      this.changeCurrentRoomExitLabel(
        inputValue,
        this.directions.n,
        this.northExitLabelInput
      );
    };
    this.southExitLabelInput.onchange = () => {
      const inputValue = this.southExitLabelInput.value;
      this.changeCurrentRoomExitLabel(
        inputValue,
        this.directions.s,
        this.southExitLabelInput
      );
    };
    this.westExitLabelInput.onchange = () => {
      const inputValue = this.westExitLabelInput.value;
      this.changeCurrentRoomExitLabel(
        inputValue,
        this.directions.w,
        this.westExitLabelInput
      );
    };
    this.eastExitLabelInput.onchange = () => {
      const inputValue = this.eastExitLabelInput.value;
      this.changeCurrentRoomExitLabel(
        inputValue,
        this.directions.e,
        this.eastExitLabelInput
      );
    };

    // exit linkto dropdowns
    this.northExitLinktoSelect.onchange = () => {
      this.changeCurrentRoomExitLinkto(
        this.northExitLinktoSelect.value,
        this.directions.n
      );
    };

    this.southExitLinktoSelect.onchange = () => {
      this.changeCurrentRoomExitLinkto(
        this.southExitLinktoSelect.value,
        this.directions.s
      );
    };

    this.westExitLinktoSelect.onchange = () => {
      this.changeCurrentRoomExitLinkto(
        this.westExitLinktoSelect.value,
        this.directions.w
      );
    };

    this.eastExitLinktoSelect.onchange = () => {
      this.changeCurrentRoomExitLinkto(
        this.eastExitLinktoSelect.value,
        this.directions.e
      );
    };

    this.updateUI();
  }
  updateUI() {
    this.displayJson();
    this.displayList();
    this.roomPreview.displayCurrentRoom();
    this.updatePropWindowBar();
    this.updatePropInputs();
  }
  updatePropWindowBar() {
    this.propsTopBarTitle.innerText = `room [${this.currentRoomId}]`;
    this.roomDeleteButton.disabled = this.currentRoomId === 0;
  }
  displayJson() {
    const json = JSON.stringify(this.rooms, undefined, 4);
    this.jsonCodeArea.textContent = json;
  }
  displayList() {
    const newListChildren = [];

    this.rooms.forEach((room) => {
      const newLi = document.createElement("li");
      const startingRoomLabel = room.id === 0 ? " [starting room]" : "";
      newLi.innerText = `${room.id}${startingRoomLabel}`;
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
  deleteCurrentRoom() {
    if (this.currentRoomId !== 0) {
      const index = this.rooms.indexOf(this.currentRoom);

      if (index > -1) {
        this.rooms.splice(index, 1);
      }
    }

    this.selectRoom(0);
  }
  updatePropInputs() {
    this.roomIdInput.value = this.currentRoom.id;
    this.roomIdInput.disabled = this.currentRoomId === 0;
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

    this.northExitLinktoSelect.disabled = !this.currentRoom.north;
    this.southExitLinktoSelect.disabled = !this.currentRoom.south;
    this.westExitLinktoSelect.disabled = !this.currentRoom.west;
    this.eastExitLinktoSelect.disabled = !this.currentRoom.east;
    this.northExitLabelInput.disabled = !this.currentRoom.north;
    this.southExitLabelInput.disabled = !this.currentRoom.south;
    this.westExitLabelInput.disabled = !this.currentRoom.west;
    this.eastExitLabelInput.disabled = !this.currentRoom.east;

    if (this.currentRoom.north) {
      this.updateLinktoDropdownOptions(this.northExitLinktoSelect);
      this.northExitLinktoSelect.value = this.currentRoom.north.linkTo;
    }
    if (this.currentRoom.south) {
      this.updateLinktoDropdownOptions(this.southExitLinktoSelect);
      this.southExitLinktoSelect.value = this.currentRoom.south.linkTo;
    }
    if (this.currentRoom.west) {
      this.updateLinktoDropdownOptions(this.westExitLinktoSelect);
      this.westExitLinktoSelect.value = this.currentRoom.west.linkTo;
    }
    if (this.currentRoom.east) {
      this.updateLinktoDropdownOptions(this.eastExitLinktoSelect);
      this.eastExitLinktoSelect.value = this.currentRoom.east.linkTo;
    }
  }
  updateLinktoDropdownOptions(dropdown) {
    const options = [];
    this.allRoomIds.forEach((id) => {
      const newOption = document.createElement("option");
      newOption.value = id;
      newOption.text = id;
      options.push(newOption);
    });

    dropdown.replaceChildren(...options);
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
    if (this.isValidId(value) && this.currentRoomId !== 0) {
      this.changeLinksToCurrentRoom(this.currentRoomId, value);
      this.currentRoom.id = `${value}`;
      this.currentRoomId = `${value}`;
      this.selectRoom(`${value}`);
    } else {
      this.roomIdInput.value = `${this.currentRoomId}`;
    }
  }
  changeLinksToCurrentRoom(oldId, newId) {
    const allExits = this.getAllExits();

    allExits.forEach((exit) => {
      if (exit.linkTo === oldId) {
        exit.linkTo = newId;
      }
    });
  }
  getRoomExits(room) {
    const exits = [];
    this.allDirections.forEach((direction) => {
      if (room[direction]) {
        exits.push(room[direction]);
      }
    });

    return exits;
  }
  getAllExits() {
    const allExits = [];
    this.rooms.forEach((room) => {
      const roomExits = this.getRoomExits(room);

      if (roomExits.length > 0) {
        allExits.push(...roomExits);
      }
    });

    return allExits;
  }
  changeCurrentRoomTextColor(value) {
    if (isColor(value)) {
      this.currentRoom.textColor = `${value}`;
      this.updateUI();
    } else {
      this.roomTextColorInput.value = `${this.currentRoom.textColor}`;
    }
  }
  changeCurrentRoomBackgroundColor(value) {
    if (isColor(value)) {
      this.currentRoom.backgroundColor = `${value}`;
      this.updateUI();
    } else {
      this.roomBackgroundColorInput.value = `${this.currentRoom.backgroundColor}`;
    }
  }
  changeCurrentRoomDescription(value) {
    if (typeof value === "string") {
      this.currentRoom.description = `${value}`;
      this.updateUI();
    } else {
      this.roomDescriptionInput.value = `${this.currentRoom.description}`;
    }
  }
  enableDisableExit(direction, enabled) {
    if (enabled) {
      this.currentRoom[direction] = {
        label: "new exit",
        linkTo: 0,
      };
    } else {
      delete this.currentRoom[direction];
    }
    this.updateUI();
  }
  changeCurrentRoomExitLabel(value, direction, input) {
    if (typeof value === "string") {
      this.currentRoom[direction].label = `${value}`;
      this.updateUI();
    } else {
      input.value = `${this.currentRoom[direction].label}`;
    }
  }
  changeCurrentRoomExitLinkto(value, direction) {
    if (Number.isSafeInteger(parseInt(value))) {
      this.currentRoom[direction].linkTo = parseInt(value);
    } else {
      this.currentRoom[direction].linkTo = value;
    }
    this.updateUI();
  }
}
