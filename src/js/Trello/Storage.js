export default class Storage {
  constructor() {
    this.store = {};
    this.start();
    this.registerEvents();
  }

  get lenght() {
    return localStorage.length;
  }

  start() {
    this.getStorage();
  }

  registerEvents() {
    window.addEventListener('beforeunload', this.setStorage.bind(this));
    window.addEventListener('DOMContentLoaded', this.getStorage.bind(this));
  }

  setStorage() {
    const arrCards = Array.from(document.querySelectorAll('.card'));
    const arrContainers = Array.from(document.querySelectorAll('.container'));
    arrContainers.forEach((item) => {
      const arrCardsContainer = arrCards.filter(
        (elem) => item.title === elem.dataset.parent
      );
      const arrCardObj = [];
      arrCardsContainer.forEach((elem) => {
        arrCardObj.push({ text: elem.textContent, id: elem.dataset.id });
      });
      this.store[item.title] = arrCardObj;
      localStorage.setItem(item.title, JSON.stringify(this.store[item.title]));
    });
  }

  getStorage() {
    for (let key in localStorage) {
      // eslint-disable-next-line no-prototype-builtins
      if (localStorage.hasOwnProperty(key)) {
        this.store[key] = JSON.parse(localStorage.getItem(key));
      }
    }
  }
}
