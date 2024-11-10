let score = 0;
let targetClicks = 3; // Number of correct clicks to win
let gameOver = false;
let timeLeft = 10; // Timer duration in seconds
let timerInterval;
let objectInterval; // Declare objectInterval globally to manage falling objects

// Define the sound effects
let correctSound = new Audio('sounds/mixkit-long-pop-2358.wav'); // Sound for first head's correct object
let electricPopAudio = new Audio('sounds/mixkit-electric-pop-2365.wav'); // Sound for second head's correct object
let wrongSound = new Audio('sounds/mixkit-wrong-2042.wav'); // Sound for wrong objects
let winSound = new Audio('sounds/mixkit-completion-of-a-level-2063.wav'); // Sound for when the game is won
let loseSound = new Audio('sounds/mixkit-funny-fail-low-tone-2876.wav'); // Sound for when the game is lost

// Function to create a falling object
function createFallingObject() {
    const object = document.createElement('div');
    object.classList.add('object');

    // Randomly assign correct or wrong class
    if (Math.random() < 0.5) {
        object.classList.add('correct');  // First head's correct object
    } else {
        object.classList.add('wrong');    // Wrong object
    }

    // Randomly assign the second correct class to simulate a second head's objects
    if (Math.random() < 0.5) {
        object.classList.add('second-head-correct');  // Second head's correct object
    }

    // Set a random position for the object
    object.style.left = Math.random() * (650) + 'px'; // Adjusted for container width
    document.getElementById('objects').appendChild(object);

    // Start falling
    let fallSpeed = Math.random() * 2000 + 1000; // Random speed between 1-3 seconds
    object.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(900px)' }], {
        duration: fallSpeed,
        easing: 'linear',
        fill: 'forwards'
    });

    object.addEventListener('click', () => {
        if (gameOver) return; // Don't allow clicks after game over

        if (object.classList.contains('correct')) {
            score++;
            document.getElementById('score').innerText = `Score: ${score}`;
            object.remove(); // Remove the object on click

            // Play the sound when the correct object (first head) is clicked
            correctSound.play();

            if (score >= targetClicks) {
                endGame(true); // Win case
            }
        } else if (object.classList.contains('second-head-correct')) {
            object.remove(); // Remove the object on click (but no point awarded)

            // Play the second head's correct sound
            electricPopAudio.play();  // Play the second head's sound

            // No score increment for second head's correct object
        } else {
            // Play the wrong sound if a wrong object is clicked
            wrongSound.play();
            object.remove(); // Remove the wrong object on click
        }
    });

    // Remove object if it falls out of view
    setTimeout(() => {
        object.remove();
    }, fallSpeed);
}

// Timer function
function startTimer() {
    timeLeft = 10; // Reset time left
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            endGame(false); // Lose case
        }
    }, 1000); // Update every second
}

// End game function
function endGame(win) {
    gameOver = true;
    clearInterval(timerInterval); // Stop the timer
    clearInterval(objectInterval); // Stop creating falling objects

    // Display win or lose message
    const gameOverMessage = win ? 'Congratulations! You clicked the correct objects!' : 'Game Over! You ran out of time!';
    document.getElementById('game-over-message').innerText = gameOverMessage;
    document.getElementById('play-again').style.display = 'inline-block';
    document.getElementById('exit-game').style.display = 'inline-block';
    document.getElementById('game-over').style.display = 'block'; // Show game over section

    // Play the winning sound if the player won
    if (win) {
        winSound.play();
    } else {
        // Play the losing sound if the player lost
        loseSound.play();
    }

    // Hide footer when game ends
    footer.classList.remove('footer-visible');
}

// Function to reset the game
function resetGame() {
    score = 0;
    gameOver = false;
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('timer').innerText = 'Time left: 10 seconds'; // Reset timer display
    document.getElementById('objects').innerHTML = ''; // Clear falling objects
    document.getElementById('game-over').style.display = 'none'; // Hide game over message
    startTimer(); // Start the timer again
    startFallingObjects(); // Start generating falling objects again
}

// Function to start generating falling objects
function startGame() {
    // Show game container and hide main menu
    document.getElementById('main-menu').style.display = 'none'; // Hide the main menu
    document.getElementById('game-container').style.display = 'block'; // Show game container

    // Hide footer during the game
    footer.classList.remove('footer-visible');

    resetGame(); // Reset game states
    startFallingObjects(); // Start generating falling objects
}

// Function to start creating falling objects
function startFallingObjects() {
    objectInterval = setInterval(() => {
        if (!gameOver) {
            createFallingObject();
        }
    }, 1000); // Create a new object every second
}

// Add event listener to the Start Game button
document.getElementById('start-game').addEventListener('click', startGame);

// Add event listener to the Play Again button
document.getElementById('play-again').addEventListener('click', resetGame);

// Add event listener to the Exit Game button
document.getElementById('exit-game').addEventListener('click', () => {
    // When exit game is clicked, hide the game container and show main menu
    document.getElementById('game-over').style.display = 'none'; // Hide game over message
    document.getElementById('main-menu').style.display = 'flex'; // Show main menu again
    document.getElementById('game-container').style.display = 'none'; // Hide game container
    gameOver = true; // Ensure game is considered over
    clearInterval(timerInterval); // Stop timer to avoid interference
    clearInterval(objectInterval); // Stop creating objects if necessary
    // Reset score and timer for when the game starts again
    score = 0; 
    document.getElementById('score').innerText = `Score: ${score}`; // Reset score display
    document.getElementById('timer').innerText = 'Time left: 10 seconds'; // Reset timer display
    document.getElementById('objects').innerHTML = ''; // Clear falling objects

    // Show footer again after exiting the game
    footer.classList.add('footer-visible');
});

// Start the game for the first time
document.getElementById('game-container').style.display = 'none'; // Ensure game container is hidden initially
document.getElementById('main-menu').style.display = 'flex'; // Ensure main menu is visible initially

// Show footer initially when on the main menu
const footer = document.querySelector('footer');
footer.classList.add('footer-visible');

// Declare the audio element and the sound toggle button
let audio = new Audio('sounds/mixkit-city-traffic-background-ambience-2930 (1).wav');
let soundToggleButton = document.getElementById('sound-toggle');

// Flag to track whether sound is on or off
let soundOn = true;

// Function to toggle sound on and off
function toggleSound() {
    if (soundOn) {
        audio.pause(); // Pause the audio
        soundToggleButton.innerText = 'Sound On'; // Change button text
    } else {
        audio.play(); // Play the audio
        soundToggleButton.innerText = 'Sound Off'; // Change button text
    }
    soundOn = !soundOn; // Toggle the sound flag
}

// Event listener for the sound toggle button
soundToggleButton.addEventListener('click', toggleSound);

// Start playing the audio when the page loads (but immediately paused)
audio.loop = true; // Loop the audio indefinitely
audio.play(); // Start the audio (it will be paused until sound is toggled)
audio.pause(); // Start paused to respect auto-play restrictions

// Define the hover sound effect
let hoverSound = new Audio('sounds/mixkit-on-or-off-light-switch-tap-2585.wav'); // Path to the hover sound

// Function to play hover sound
function playHoverSound() {
    hoverSound.currentTime = 0; // Reset sound to the beginning
    hoverSound.play();
}

// Function to stop hover sound
function stopHoverSound() {
    hoverSound.pause();  // Stop the sound
    hoverSound.currentTime = 0;  // Reset to the start of the sound for next time
}

// Add event listeners to buttons for hover sound
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', playHoverSound);  // Play sound on hover
    button.addEventListener('mouseleave', stopHoverSound);  // Stop sound on hover off
});

// Define the button press sound effect
let buttonPressSound = new Audio('sounds/mixkit-mouse-click-close-1113.wav'); // Path to the press sound

// Function to play button press sound
function playButtonPressSound() {
    buttonPressSound.currentTime = 0; // Reset sound to the beginning
    buttonPressSound.play(); // Play the sound
}

// Add event listeners to buttons for press sound
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', playButtonPressSound);  // Play sound on button click
});


