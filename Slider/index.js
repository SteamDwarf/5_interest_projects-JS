'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const downButton = document.querySelector('.down-button');
    const upButton = document.querySelector('.up-button');
    const sidebar = document.querySelector('.sidebar');
    const mainSlide = document.querySelector('.main-slide');
    const mainSlideElements = mainSlide.querySelectorAll('div');
    const slides = mainSlideElements.length;
    const container = document.querySelector('.container');
    const height = container.clientHeight;

    let activeSlide = 0;
    let wheeling = false;

    function scrollSlides(direction) {
        if(direction === 'up') {
            activeSlide++;
            if(activeSlide >= slides) {
                activeSlide = 0;
            }
        }else if(direction === 'down') {
            activeSlide--;
            if(activeSlide < 0) {
                activeSlide = slides - 1;
            }
        }

        mainSlide.style.transform = `translateY(-${height * activeSlide}px)`;
        sidebar.style.transform = `translateY(${height * activeSlide}px)`;
    }
    function setStartPosition() {
        sidebar.style.top = `-${(slides - 1) * 100}vh`;
    }
    function makeWheeling(deltaY) {
        if(wheeling) {
            return;
        }
        console.log(deltaY);
        wheeling = true;
        if(deltaY < 0) {
            scrollSlides('up');
        } else if(deltaY > 0) {
            scrollSlides('down');
        }

        setTimeout(() => {
            wheeling = false;
        }, 500);
    }

    upButton.addEventListener('click', () => scrollSlides('up'));
    downButton.addEventListener('click', () => scrollSlides('down'));
    document.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowDown') {
            scrollSlides('down');
        } else if(e.key === 'ArrowUp') {
            scrollSlides('up');
        } else if(e.key === 'w') {
            scrollSlides('up');
        } else if(e.key === 's') {
            scrollSlides('down');
        }
    });
    window.addEventListener('wheel', (e) => makeWheeling(e.deltaY));

    setStartPosition();
});