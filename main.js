"use strict";

window.addEventListener("load", start);

let playerList = [];

function start() {
  console.log("start");
  activateClickEvents();
}

function activateClickEvents() {
  document
    .querySelector("#new_player_form")
    .addEventListener("submit", addPlayerToGame);
}

function addPlayerToGame(event) {
  event.preventDefault();
  const newPlayer = event.target.player.value;

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
    <h2>${player}</h2>
    <button>Remove</button>
    `;

    document
      .querySelector("#player_list_overview")
      .insertAdjacentHTML("beforeend", playerHTML);
  }
}

// 5 terninger - re'roll...
//How many players
// How to change turn...
//
