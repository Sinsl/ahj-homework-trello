export default class Storage {
  constructor() {
    this.store = {};
    this.start();
    this.registerEvents();
  }

  start() {
    this.getStorage();
  }

  registerEvents() {
    window.addEventListener('beforeunload', this.setStorage.bind(this));
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
    });
    localStorage.setItem('store', JSON.stringify(this.store));
  }

  getStorage() {
    this.store = JSON.parse(localStorage.getItem('store')) || {};
  }
}
