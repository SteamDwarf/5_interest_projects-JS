'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('#startButton');
    const startScreen = document.querySelector('#startScreen');
    const timeScreen = document.querySelector('#timeScreen');
    const gameScreen = document.querySelector('#gameScreen');
    const finishScreen = document.querySelector('#finishScreen');
    const timeList = document.querySelector('#timeList');
    const timerTime = document.querySelector('#time');
    const timerDisplay = document.querySelector('#timerDisplay');
    const board = document.querySelector('#board');
    const scoreDisplay= document.querySelector('#score');
    const resetBtn = document.querySelector('#resetBtn');
    const {width, height} = board.getBoundingClientRect();
    const circleColors = ['#fff', '#46AEF7', '#B172C2', '#F2EC2D', '#6CD55B', '#F56370'];

    let time;
    let timer;
    let circle;
    let score = 0;

    function getRandomNumber(min, max) {
        let number = Math.ceil(Math.random() * (max - min) + min);
        return number;
    }

    function startGame() {
        setTime(time);
        timer = setInterval(changeTime, 1000);

        createRandomCircle();
    }
    function setTime(time) {
        let curTime = time;
        if(curTime < 10) {
            curTime = `0${curTime}`;
        }
        timerTime.textContent = `00:${curTime}`;
    }
    function changeTime() {
        if(time <= 0) {
            finishGame();
            clearInterval(timer);
            return;
        }

        time--;
        setTime(time);
    }
    function createRandomCircle() {
        circle = document.createElement('div');
        circle.classList.add('circle');
        
        circle.addEventListener('click', hoverCircle)

        setCircleProperties();
        board.append(circle);
    }
    function hoverCircle() {
        score++;
        setCircleProperties();
    }
    function setCircleProperties() {
        let circleSize = getRandomNumber(5, 25);
        let x = getRandomNumber(circleSize, width - circleSize);
        let y = getRandomNumber(circleSize, height - circleSize);
        let colorIndex = Math.ceil(Math.random() * 4);

        console.log(colorIndex);

        circle.style.width = `${circleSize}px`;
        circle.style.height = `${circleSize}px`;
        circle.style.top = `${y}px`;
        circle.style.left = `${x}px`;
        circle.style.backgroundColor = circleColors[colorIndex];
    }
    function finishGame() {
        scoreDisplay.textContent = score;
        gameScreen.classList.add('up');
    }
    function resetGame(e) {
        e.preventDefault();

        circle.remove();
        score = 0;
        
        gameScreen.classList.remove('up');
        timeScreen.classList.remove('up');
    }

    startButton.addEventListener('click', (e) => {
        e.preventDefault();
        startScreen.classList.add('up');
    });
    timeList.addEventListener('click', (e) => {
        if(e.target.classList.contains('time-btn')) {
            time = parseInt(e.target.getAttribute('data-time'));
            timeScreen.classList.add('up');
            
            startGame();
        }
    });
    resetBtn.addEventListener('click', resetGame);
});