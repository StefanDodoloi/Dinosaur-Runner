let dinosaur = document.getElementById('dinosaur');
let gameOver = false;
let totalSeconds = 0;
let points = 0;
let cactusSpeed = 10;

const gameContainer = document.getElementById('game-container');
const gameContainerWidth = parseInt(window.getComputedStyle(gameContainer).width);
const dinosaurWidth = parseInt(window.getComputedStyle(dinosaur).width);

dinosaur.style.left = `${50}px`;
dinosaur.style.top = `${380}px`;

document.addEventListener('keydown', (event) => {
    if (event.key === ' ' || event.code === 'ArrowUp') {
        jump();
    }
});

function jump() {
    if (!dinosaur.classList.contains('jumping') && !gameOver) {
        dinosaur.classList.add('jumping');
        setTimeout(() => {
            dinosaur.classList.remove('jumping');
        }, 1100);
    }
}

function createCactus() {
    if (!gameOver) {
        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        cactus.style.left = `${(gameContainer.offsetWidth - cactus.width)}px`;
        gameContainer.appendChild(cactus);
        moveCactus(cactus);
    }
}

function createRandomInterval() {
    return Math.random() * 2000 + 1000;
}

function createRandomCactus() {
    createCactus();
    setTimeout(createRandomCactus, createRandomInterval());
}

function moveCactus(cactus) {
    const moveInterval = setInterval(() => {
        if(!gameOver) {
            const currentPosition = parseInt(window.getComputedStyle(cactus).left);
            if (currentPosition > 0) {
                cactus.style.left = `${currentPosition - cactusSpeed}px`;
            } else {
                cactus.remove();
                ++points;
                score();
                clearInterval(moveInterval);
            }
            checkCollision(cactus);
        } else {
            clearInterval(moveInterval);
        }
    }, 30);
}

function checkCollision(cactus) {
    const dinosaurRect = dinosaur.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();
    if (
        dinosaurRect.right > cactusRect.left &&
        dinosaurRect.left < cactusRect.right &&
        dinosaurRect.top < cactusRect.bottom &&
        dinosaurRect.bottom > cactusRect.top
    ) {
        gameOver = true;
        gameOverMessage();
    }
}

function timer() {
    if (!gameOver) {
        ++totalSeconds;
        let hour = Math.floor(totalSeconds / 3600);
        let minute = Math.floor((totalSeconds - hour * 3600) / 60);
        let seconds = totalSeconds - (hour * 3600 + minute * 60);
        if(hour < 10)
            hour = '0' + hour;
        if(minute < 10)
            minute = '0' + minute;
        if(seconds < 10)
            seconds = '0' + seconds;
        document.getElementById('timer').innerHTML = 'Time: ' + hour + ':' + minute + ':' + seconds;
        if (totalSeconds % 10 === 0) {
            ++cactusSpeed;
        }
    }
}

function score() {
    document.getElementById('score').innerHTML = 'Score: ' + points;
}

function gameOverMessage() {
    document.getElementById('gameOver').innerHTML = 'Game Over!';
}

createRandomCactus();
setInterval(timer, 1000);
score();