'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.item');
    const placeholders = document.querySelectorAll('.placeholder');

    let choosedItem;

    function changeProcessClass(placeholder) {
        if(placeholder.id === 'start') {
            choosedItem.className = 'item';
        } else if(placeholder.id === 'progress') {
            choosedItem.className = 'item in-process';
        } else if(placeholder.id === 'done') {
            choosedItem.className = 'item finished';
        }
    }

    function dragStart(e) {
        choosedItem = e.target;
        e.target.className = 'item hold';
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);
    }
    function dragEnd(e) {
        e.target.classList.remove('hold', 'hide');
        choosedItem = null;
    }

    function dragDrop(e) {
        e.target.append(choosedItem);
        e.target.classList.remove('hovered');
        changeProcessClass(e.target);
    }
    function dragOver(e) {
        e.preventDefault();
    }
    function dragEnter(e) {
        e.target.classList.add('hovered');
    }
    function dragLeave(e) {
        e.target.classList.remove('hovered');
    }

    items.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    placeholders.forEach(placeholder => {
        placeholder.addEventListener('drop', dragDrop);
        placeholder.addEventListener('dragover', dragOver);
        placeholder.addEventListener('dragenter', dragEnter);
        placeholder.addEventListener('dragleave', dragLeave);
    });
});