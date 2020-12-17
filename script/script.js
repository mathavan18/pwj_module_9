//Challenge 1: Your age in days
function calculateAge() {
  let birthYear = prompt("What year were you born ?");
  let ageInDays = (2020 - birthYear) * 365;
  let h1 = document.createElement("h1");
  let textAnswer = document.createTextNode("You are " + ageInDays + "days old");
  h1.setAttribute("id", "ageInDays");
  h1.appendChild(textAnswer);
  document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
  document.getElementById("ageInDays").remove();
}

// Challenge 2: Generate Cat
function generateCat() {
  let img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://thecatapi.com/api/images/get?format=src&type=gif&size-small"
  );
  img.setAttribute("alt", "");
  document.getElementById("flex-box-cat-container").appendChild(img);
}

const options = {
  1: "rock",
  2: "scissor",
  3: "paper",
};

const imgLink = {
  rock:
    "http://images.clipartpanda.com/rock-clipart-clipart-harvestable-resources-rock.png",
  paper: "http://images.clipartpanda.com/paper-clip-art-niEBBqMiA.svg",
  scissor:
    "http://images.clipartpanda.com/scissors-clip-art-nicubunu_Scissors.png",
};

// Rock, Paper, Scissor game
function rpsGame(yourChoice) {
  let humanChoice, botChoice;
  humanChoice = yourChoice.id;
  botChoice = options[getRndInteger(1, 4)];

  result = decideWinner(humanChoice, botChoice);
  message = finalMessage(result);
  rpsFrontEnd(humanChoice, botChoice, message);
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function decideWinner(humanChoice, botChoice) {
  if (humanChoice == botChoice) {
    return 0;
  } else if (
    (humanChoice == "rock" && botChoice == "scissor") ||
    (humanChoice == "scissor" && botChoice == "paper") ||
    (humanChoice == "paper" && botChoice == "rock")
  ) {
    return 1;
  } else {
    return 2;
  }
}

function finalMessage(result) {
  let color = "";
  let message = "";

  switch (result) {
    case 0:
      message = "Tie";
      color = "brown";
      break;
    case 1:
      message = "You won !";
      color = "green";
      break;
    case 2:
      message = "You lost";
      color = "red";
      break;
  }

  return {
    text: message,
    color: color,
  };
}

function rpsFrontEnd(yourChoice, botChoice, message) {
  let flexBoxRpsDiv = document.getElementById("flex-box-rps-div");

  flexBoxRpsDiv.innerHTML = "";

  let yourChoiceImageElement = createImageElement(yourChoice, "humanChoice");
  let messageElement = createMessageElement(message);
  let botChoiceImageElement = createImageElement(botChoice, "botChoice");

  flexBoxRpsDiv.appendChild(yourChoiceImageElement);
  flexBoxRpsDiv.appendChild(messageElement);
  flexBoxRpsDiv.appendChild(botChoiceImageElement);
}

function createImageElement(selectedChoice, selectedChoiceId) {
  let img = document.createElement("img");
  img.setAttribute("id", `${selectedChoiceId}`);
  img.setAttribute("src", `${imgLink[selectedChoice]}`);
  img.setAttribute("height", "150px");
  img.setAttribute("width", "150px");
  if (selectedChoiceId == "humanChoice") {
    img.setAttribute("style", "box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)");
  } else {
    img.setAttribute(
      "style",
      "box-shadow: 0px 10px 50px rgba( 233, 37, 37, 1)"
    );
  }
  return img;
}

function createMessageElement(message) {
  let h2tag = document.createElement("h2");
  let textMessage = document.createTextNode(message.text);
  h2tag.setAttribute("id", "gameResult");
  h2tag.setAttribute("style", `color:${message.color}`);
  h2tag.appendChild(textMessage);
  return h2tag;
}

// Button color change

function buttonColorChange(selection) {
  let buttonList = document.getElementsByClassName("btn");
  for (let buttonElement of buttonList) {
    setColor(buttonElement, selection.value);
  }
}

const colorClass = {
  1: "btn btn-primary",
  2: "btn btn-secondary",
  3: "btn btn-success",
  4: "btn btn-danger",
  5: "btn btn-warning",
};

function setColor(buttonElement, selection) {
  switch (selection) {
    case "red":
      buttonElement.className = "btn btn-danger";
      break;
    case "green":
      buttonElement.className = "btn btn-success";
      break;
    case "random":
      let randomColor = colorClass[getRndInteger(1, 6)];
      buttonElement.className = randomColor;
      break;
    case "reset":
      location.reload();
      break;
  }
}

// Challenge 5: Blackjack App

document
  .querySelector("#blackjack-hit-btn")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-deal-btn")
  .addEventListener("click", blackjackDeal);

document
  .querySelector("#blackjack-stand-btn")
  .addEventListener("click", blackjackStand);

const cards = {
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "7",
  8: "8",
  9: "9",
  10: "10",
  11: "A",
  12: "J",
  13: "K",
  14: "Q",
};

const cardsMap = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  A: [11, 1],
  J: 10,
  K: 10,
  Q: 10,
};

let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  wins: 0,
  losses: 0,
  drew: 0,
  isStand: false,
  turnsOVer: false,
};
const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const hitSound = new Audio("/assets/sounds/swish.m4a");
const winSound = new Audio("/assets/sounds/cash.mp3");
const lossSound = new Audio("/assets/sounds/aww.mp3");

function blackjackHit() {
  if (!blackjackGame["isStand"]) {
    let activePlayer = blackjackGame["you"];
    let rndNumber = getRndInteger(2, 15);
    let selectedCard = cards[rndNumber];
    showCard(activePlayer, selectedCard);
    calculateScore(activePlayer, selectedCard);
    if (activePlayer["score"] <= 21) {
      showScore(activePlayer);
    } else {
      showBust(activePlayer);
    }
  }
}

function blackjackDeal() {
  if (blackjackGame["turnsOVer"]) {
    let activePlayer = blackjackGame["you"];
    clear(activePlayer);
    activePlayer = blackjackGame["dealer"];
    clear(activePlayer);
    document.querySelector("#blackjack-result").textContent = "Let's play!";
    document.querySelector("#blackjack-result").style.color = "black";

    blackjackGame["isStand"] = false;
    blackjackGame["turnsOVer"] = true;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function blackjackStand() {
  blackjackGame["isStand"] = true;
  let activePlayer = blackjackGame["dealer"];
  clear(activePlayer);
  botPlay();
}

async function botPlay() {
  let activePlayer = blackjackGame["dealer"];
  let rndNumber = getRndInteger(2, 15);
  let selectedCard = cards[rndNumber];

  while (activePlayer["score"] < 16 && blackjackGame["isStand"]) {
    showCard(activePlayer, selectedCard);
    calculateScore(activePlayer, selectedCard);
    showScore(activePlayer);
    await sleep(1000);
  }

  blackjackGame["turnsOVer"] = true;
  let winner = calculateWinner();
  showResult(winner);
}

function showCard(activePlayer, selectedCard) {
  let img = document.createElement("img");
  img.setAttribute("src", `/assets/images/${selectedCard}.png`);
  document.querySelector(`${activePlayer.div}`).appendChild(img);
  hitSound.play();
}

function clear(activePlayer) {
  activePlayer["score"] = 0;
  document.querySelectorAll(`${activePlayer.div} img`).forEach((cardImg) => {
    cardImg.remove();
  });
  document.querySelector(`${activePlayer["scoreSpan"]}`).textContent = 0;
  document.querySelector(`${activePlayer["scoreSpan"]}`).style.color = "white";
}

function calculateScore(activePlayer, selectedCard) {
  let selectedCardValue = cardsMap[selectedCard];
  if (selectedCard == "A") {
    if (activePlayer["score"] + selectedCardValue[0] > 21) {
      if (activePlayer["score"] + selectedCardValue[1] > 21) {
        console.log("Busted");
        return;
      } else {
        selectedCardValue = selectedCardValue[1];
      }
    } else {
      selectedCardValue = selectedCardValue[0];
    }
  }
  activePlayer["score"] += selectedCardValue;
}

function showScore(activePlayer) {
  if (activePlayer["score"] <= 21) {
    document.querySelector(`${activePlayer["scoreSpan"]}`).textContent =
      activePlayer["score"];
  } else {
    showBust();
  }
}

function showBust(activePlayer) {
  document.querySelector(`${activePlayer["scoreSpan"]}`).textContent = "BUST";
  document.querySelector(`${activePlayer["scoreSpan"]}`).style.color = "red";
}

function calculateWinner() {
  let winner;
  let yourScore = blackjackGame["you"]["score"];
  let dealerScore = blackjackGame["dealer"]["score"];

  if (yourScore <= 21) {
    if (yourScore > dealerScore || dealerScore > 21) {
      console.log("You Won!");
      winner = YOU;
    } else if (yourScore < dealerScore) {
      console.log("You lost!");
      winner = DEALER;
    } else if (yourScore == dealerScore) {
      console.log("You drew!");
    }
  } else if (yourScore > 21 && dealerScore <= 21) {
    console.log("You lost !");
    winner = DEALER;
  } else if (yourScore > 21 && dealerScore > 21) {
    console.log("You drew !");
  }

  console.log("winner is" + winner);
  return winner;
}

function showResult(winner) {
  let message, messageColor;
  if (blackjackGame["turnsOVer"]) {
    if (winner === YOU) {
      message = "You won!";
      messageColor = "green";
      winSound.play();
      blackjackGame["wins"]++;
    } else if (winner === DEALER) {
      message = "Uou loss!";
      messageColor = "red";
      lossSound.play();
      blackjackGame["losses"]++;
    } else {
      message = "You drew!";
      messageColor = "black";
      blackjackGame["drew"]++;
    }

    document.querySelector("#wins").textContent = blackjackGame["wins"];
    document.querySelector("#losses").textContent = blackjackGame["losses"];
    document.querySelector("#draws").textContent = blackjackGame["drew"];
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
  }
}
