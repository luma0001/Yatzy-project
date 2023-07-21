"use strict";

window.addEventListener("load", start);

let playerList = ["Mikkel", "Line", "Peter", "Kasper"];
let playerScores = [];
// const dices = ["dice_1", "dice_2", "dice_3", "dice_4", "dice_5"];

const dices = [
  { title: "dice01", active: true, value: "?" },
  { title: "dice02", active: true, value: "?" },
  { title: "dice03", active: true, value: "?" },
  { title: "dice04", active: true, value: "?" },
  { title: "dice05", active: true, value: "?" },
];

let firstRoll = true;
let rolls = 3;

function start() {
  console.log("start");
  activateClickEvents();
}

function activateClickEvents() {
  document
    .querySelector("#new_player_form")
    .addEventListener("submit", addPlayerToGame);

  document
    .querySelector("#start_game_btn")
    .addEventListener("click", startGameDialog);

  document
    .querySelector("#accept_start_game_btn")
    .addEventListener("click", startNewGame);

  document
    .querySelector("#close_start_game_dialog_btn")
    .addEventListener("click", closeStartGameDialog);

  document
    .querySelector("#change_turn_btn")
    .addEventListener("click", changeTurnBtnClicked);

  document.querySelector("#roll_dice_btn").addEventListener("click", diceRoll);
}

function addPlayerToGame(event) {
  event.preventDefault();
  const newPlayer = event.target.player.value;
  document.querySelector("#player_name").value = "";
  // for (let player in playerList) {
  //   if (player === newPlayer) {
  //     console.log("Players must have different names");
  //   } else {
  //     console.log(newPlayer);
  //     playerList.push(newPlayer);
  //   }
  // }

  playerList.push(newPlayer);
  updatePlayerList();
}

function updatePlayerList() {
  console.log("updatePlayerList");
  document.querySelector("#player_list_overview").innerHTML = "";

  for (const player of playerList) {
    const playerHTML = `
    <article>
    <h2>${player}</h2>
    <button class="remove_btn">Remove</button>
    </article>
    `;

    document
      .querySelector("#player_list_overview")
      .insertAdjacentHTML("beforeend", playerHTML);

    document
      .querySelector("#player_list_overview article:last-child .remove_btn")
      .addEventListener("click", () => confirmDeletePlayer(player));
  }
}

function confirmDeletePlayer(playerName) {
  document.querySelector(
    "#player_to_be_removed"
  ).textContent = `Do you wish to remove ${playerName} from the list?`;

  document.querySelector("#remove_player_dialog").showModal();

  document
    .querySelector("#remove_player_from_playerlist_btn")
    .addEventListener("click", () => removePlayerFromList(playerName));

  document
    .querySelector("#close_remove_player_dialog_btn")
    .addEventListener("click", closeRemovePlayerDialog);
}

function removePlayerFromList(deletedPlayer) {
  closeRemovePlayerDialog();
  for (const player of playerList) {
    if (player === deletedPlayer) {
      playerList.splice(playerList.indexOf(player), 1);
    }
  }
  updatePlayerList();
}

function startGameDialog() {
  document.querySelector("#game_player_list").innerHTML = "";

  for (const player of playerList) {
    const playerListHTML = `
    <li>${player}</li>
    `;

    document
      .querySelector("#game_player_list")
      .insertAdjacentHTML("beforeend", playerListHTML);
  }
  document.querySelector("#start_game_dialog").showModal();
}

function closeStartGameDialog() {
  document.querySelector("#start_game_dialog").close();
}

function closeRemovePlayerDialog() {
  document.querySelector("#remove_player_dialog").close();
}

// LAV EN MASSE OBJEKTER Navn:{PointNanv:PointVærdi}
// PUT DEN IND I TABLE VIEWET...
// VÆR GANG EN VÆRDI INDSÆTTES SKAL DET REFRESHES...

// LAV ET TERNINGE SYSTEM MED SELEKTIVE RE-ROLLS
// LAV ET SYSTEM HVOR DET KØRER PÅ TUR
// LINK ROLLS TIL POINT TAVLEN - TJEK AT VÆRDIEN ER VALLID IFØLGE SPILLETS REGLER...
// REGNUD HVORNÅR SPILLET SLUTTER

function startNewGame() {
  closeStartGameDialog();
  createPlayersPointObjects();
  updatePlayerTurnDisplay();
  // diceRoll();
  displayDiceValues();
}

function createPlayersPointObjects() {
  for (const player of playerList) {
    const playerObject = {
      playerName: player,
      ones: "",
      twos: "",
      threes: "",
      fours: "",
      fives: "",
      sixes: "",
      sum: "",
      onePair: "",
      twoPair: "",
      threeAlike: "",
      fourAlike: "",
      smallStraight: "",
      largeStraight: "",
      house: "",
      chance: "",
      yahtzee: "",
      total: "",
    };
    playerScores.push(playerObject);
  }

  createNewYhatzeeTable();
}

function createNewYhatzeeTable() {
  for (const player of playerScores) {
    const playerPointsHTML =
      /*HTML*/
      `
  <td>${player.playerName}</td>
  <td>${player.ones}</td>
  <td>${player.twos}</td>
  <td>${player.threes}</td>
  <td>${player.fours}</td>
  <td>${player.fives}</td>
  <td>${player.sixes}</td>
  <td>${player.sum}</td>
  <td>${player.onePair}</td>
  <td>${player.twoPair}</td>
  <td>${player.threeAlike}</td>
  <td>${player.fourAlike}</td>
  <td>${player.smallStraight}</td>
  <td>${player.largeStraight}</td>
  <td>${player.house}</td>
  <td>${player.chance}</td>
  <td>${player.yahtzee}</td>
  <td>${player.total}</td>
  `;
    document
      .querySelector("#points_table_body")
      .insertAdjacentHTML("beforeend", playerPointsHTML);
  }
}

function changeTurnBtnClicked() {
  nextPlayersTurn();
  resetDiceSet();
  setCurrentPlayer();
}

function nextPlayersTurn() {
  console.log("nextPlayersTurn");
  const firstPlayer = playerList[0];
  console.log(firstPlayer);
  playerList.push(firstPlayer);
  playerList.shift();
  updatePlayerTurnDisplay();
}

function updatePlayerTurnDisplay() {
  document.querySelector("#player_turn_tracker").innerHTML = "";
  console.log("updatePlayerTurnDisplay");

  for (const player of playerList) {
    const playerPositionHTML = `
    <div>${player}</div>
    `;
    document
      .querySelector("#player_turn_tracker")
      .insertAdjacentHTML("beforeend", playerPositionHTML);
  }
}

function setCurrentPlayer() {
  console.log("setCurrentPlayer");
  let activePlayer;
  const currentPlayerName = playerList[0];
  for (const player of playerScores) {
    if (currentPlayerName === player.playerName) {
      activePlayer = player;
    }
  }
  console.log(activePlayer);
}

function resetDiceSet() {
  firstRoll = true;
  rolls = 3;
  for (const dice of dices) {
    dice.active = true;
    dice.value = "?";
  }
  displayDiceValues();
}

// function displayDiceValues() {
//   document
//     .querySelectorAll("#dice_roll_section article:last-child .game_dice")
//     .addEventListener("click", diceSelected);
// }

function diceSelected(event) {
  console.log(event.target);
}

function diceRoll() {
  console.log("diceRoll");
  decrementRolls();
  if (rolls >= 0) {
    firstRoll = false;
    for (let i = 0; i < dices.length; i++) {
      const dice = dices[i];
      if (dice.active === true) {
        dice.value = diceCalculator();
        console.log(dice.value);
      } else {
        continue;
      }
    }
  }
  console.log("ROLLS:");
  console.log(rolls);
  displayDiceValues();
}

function decrementRolls() {
  rolls--;
}

function displayDiceValues() {
  clearDiceValuesDisplay();
  for (let i = 0; i < dices.length; i++) {
    const dice = dices[i];
    const game_dice = dice.value;
    document
      .querySelector(`#dice_${[i + 1]}`)
      .insertAdjacentHTML("beforeend", game_dice);

    document
      .querySelector(`#dice_${[i + 1]}`)
      .addEventListener("click", () => changeDiceActivity(dice));
  }
}

function changeDiceActivity(dice) {
  if(dice.active === true){
    dice.active = false
  } else {
  dice.active = true;  
  }
  console.log(dice);
}

function clearDiceValuesDisplay() {
  for (let i = 0; i < dices.length; i++) {
    document.querySelector(`#dice_${[i + 1]}`).innerHTML = "";
  }
}

function diceCalculator() {
  const number = Math.ceil(Math.random() * 6);
  return number;
}

// function clearAllDice() {
//   for (const i of dices) {
//     const clear = " ";
//     document
//       .querySelector(`#dice_${[i + 1]}`)
//       .insertAdjacentHTML("beforeend", clear);
//   }
// }

// 5 terninger - re'roll...
//How many players
// How to change turn...
