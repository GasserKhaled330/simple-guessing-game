const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

/**
 * Creates and returns a new guessing game instance.
 * @param {number} min - The minimum number in the range.
 * @param {number} max - The maximum number in the range.
 * @param {number} maxAttempts - The maximum number of guesses allowed.
 * @returns {object} An object containing the game's methods.
 */
function createGuessingGame(min, max, maxAttempts) {
	let attemptsLeft = maxAttempts;
	const secretNumber = randomInRange(min, max);

	/**
	 * Returns a random integer within a specified range.
	 * @param {number} min - The minimum value.
	 * @param {number} max - The maximum value.
	 * @returns {number} A random integer.
	 */
	function randomInRange(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return {
		/**
		 * Checks a player's guess against the secret number.
		 * @param {number} guess - The player's guessed number.
		 * @returns {string} A message describing the result of the guess.
		 */
		checkGuess(guess) {
			if (attemptsLeft <= 0) {
				console.log('You Lose! Out of attempts Game is over.');
				return true;
			}

			attemptsLeft--;

			if (guess === secretNumber) {
				// Correct guess ends the game
				attemptsLeft = 0;
				console.log('You win!');
				return true;
			} else if (guess > secretNumber) {
				console.log('Too High!!!');
				return false;
			} else if (guess < secretNumber) {
				console.log('Too Low!!!');
				return false;
			}
		},
	};
}
/**
 * Prompts the user for a number and performs validation.
 * @param {string} promptText - The text to display to the user.
 * @returns {Promise<number>} A promise that resolves to a valid number.
 */
async function getValidatedInput(promptText) {
	while (true) {
		const answer = await rl.question(promptText);
		const number = Number(answer);

		if (isNaN(number)) {
			console.log('Invalid input. Please enter a valid number.');
		} else {
			return Math.abs(number);
		}
	}
}

/**
 * Main game loop to get user settings and start the game.
 */
async function startGame() {
	console.log('--- Number Guessing Game Setup ---');

	const minGuess = await getValidatedInput('Enter the minimum number: ');
	const maxGuess = await getValidatedInput('Enter the maximum number: ');
	const numAttempts = await getValidatedInput('Enter the number of attempts: ');

	if (minGuess >= maxGuess) {
		console.log(
			'The minimum number must be less than the maximum. Please restart.'
		);
		rl.close();
		return;
	}

	const game = createGuessingGame(minGuess, maxGuess, numAttempts);
	console.log(
		`Starting game. Guess a number between ${minGuess} and ${maxGuess}.`
	);
	console.log(`You have ${numAttempts} attempts.`);

	async function askForGuess() {
		const guess = await getValidatedInput('Enter your guess: ');

		const result = game.checkGuess(guess);
		// console.log(result);
		if (result) {
			rl.close();
		} else {
			askForGuess();
		}
	}

	askForGuess();
}

startGame();
