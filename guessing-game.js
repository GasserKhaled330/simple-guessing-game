const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const scan = readline.createInterface({ input, output });

let numAttempts = 4;
let secretNumber;
let minNum;
let maxNum;

function checkGuess(number) {
  if (numAttempts === 0) {
    console.log("You Lose");
    return true;
  } else {
    if (number > secretNumber) {
      numAttempts--;
      console.log("Too High!!!");
      return false;
    } else if (number < secretNumber) {
      numAttempts--;
      console.log("Too Low!!!");
      return false;
    } else {
      console.log("You win!");
      return true;
    }
  }
}

function askGuess() {
  scan.question("Enter a guess: ", handleUserInput);
}

function handleUserInput(answer) {
  if (checkGuess(Number(answer))) {
    scan.close();
  } else {
    askGuess();
  }
}

function randomInRange(min, max) {
  // retrun Getting a random number between two values.
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.random() * (max - min) + min;
}

function askRange() {
  console.log("you Have only 5 attempts to guess the correct answer");
  scan.question("Enter a max Number: ", getMaxNumberFromUser);
}

function getMaxNumberFromUser(max) {
  maxNum = max;
  scan.question("Enter a min Number: ", getMinNumberFromUser);
}
function getMinNumberFromUser(min) {
  minNum = min;
  console.log(`I'm thinking of a number between ${minNum} and ${maxNum}...`);
  secretNumber = randomInRange(Number(minNum), Number(maxNum));
  askGuess();
}

askRange();
