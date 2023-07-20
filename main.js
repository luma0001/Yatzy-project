"use strict";

window.addEventListener("load", start);

let playerList = [];
let playerScores = [];

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
  palyerScores = createPlayersPointObjects();
}

function createPlayersPointObjects() {
  // for (const palyer of playerList) {
  // }
}

function createNewYhatzeeTable() {}

// 5 terninger - re'roll...
//How many players
// How to change turn...
//
