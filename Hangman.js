let word; //The word to be guessed
let wordLength; //Length of the word
let wordLetters; //Individual letters of the word
let guess; //The current guess of the player
let guessLetters; //Individual letters of the guess
let incorrectLetters; //Incorrect letters that the player has guessed
let lives; //Number of lives the player has remaining
let gameOver; //Whether the game is over
let win; //Whether the player won
let inputWord; //Input from the player

function keyPressed() {
  if (gameOver) {
    return;
  }
  if (keyCode >= 65 && keyCode <= 90) {
    let keyLower = key.toLowerCase();
    if (!guessLetters.includes(keyLower)) {
      guess += keyLower;
      guessLetters = guess.split("");
      if (!wordLetters.includes(keyLower)) {
        incorrectLetters.push(keyLower);
        lives--;
      }
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  inputWord = prompt("Enter the word to be guessed:").toLowerCase();
  word = inputWord;
  wordLength = inputWord.length;
  wordLetters = inputWord.split("");
  guess = "";
  guessLetters = guess.split("");
  incorrectLetters = [];
  lives = 6;
  gameOver = false;
  win = false;
}

function draw() {
  background(220);
  drawHangman();
  drawWord();
  drawGuess();
  drawIncorrectLetters();
  drawLives();
  checkGameOver();
  displayGameOver();
}

function drawHangman() {
  strokeWeight(4);
  //Draw the stand
  line(150, 350, 350, 350);
  line(250, 350, 250, 50);
  line(150, 50, 350, 50);
  //Draw the head
  if (lives < 6) {
    ellipse(250, 100, 50);
  }
  //Draw the body
  if (lives < 5) {
    line(250, 150, 250, 250);
  }
  //Draw the arms
  if (lives < 4) {
    line(200, 200, 250, 150);
    line(300, 200, 250, 150);
  }
  //Draw the legs
  if (lives < 3) {
    line(200, 300, 250, 250);
    line(300, 300, 250, 250);
  }
}


function drawWord() {
  fill(0);
  textSize(32);
  let displayWord = "";
  for (let i = 0; i < wordLength; i++) {
    if (guessLetters.includes(wordLetters[i])) {
      displayWord += wordLetters[i];
    } else {
      displayWord += "_";
    }
  }
  text(displayWord, 5, 300);
}

function drawGuess() {
  fill(0);
  textSize(32);
  text(guess, 5, 350);
}

function drawIncorrectLetters() {
  fill(255, 0, 0);
  textSize(32);
  text(incorrectLetters.join(" "), 5, 45);
}

function drawLives() {
  fill(0);
  textSize(32);
  text(lives, 300, 45);
}

function displayGameOver() {
  if (gameOver) {
    if (win) {
      fill(0, 255, 0);
      textSize(32);
      text("You won!", 5, 200);
    } else {
      fill(255, 0, 0);
      textSize(32);
      text("You lost!", 5, 200);
    }
  }
}
function checkGameOver() {
  let allLettersCorrect = true;
  for (let i = 0; i < wordLetters.length; i++) {
    if (!guessLetters.includes(wordLetters[i])) {
      allLettersCorrect = false;
      break;
    }
  }
  if (lives === 0) {
    gameOver = true;
    win = false;
  }
  if (allLettersCorrect) {
    gameOver = true;
    win = true;
  }
}