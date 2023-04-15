import Controller from './Trello/Controller';

const field = document.querySelector('.containers');
const start = new Controller(field);
start.init();
