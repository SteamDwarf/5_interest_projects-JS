'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');

    function clearActiveClass() {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
    }

    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            clearActiveClass();

            slide.classList.add('active');
        });
    });
});