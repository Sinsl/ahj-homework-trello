import Container from './Container';
import Storage from './Storage';
import DnD from './DnD';

export default class Controller {
  constructor(elem) {
    this.field = elem;
    this.arrContainers = [];
    this.dnd = new DnD(this.field, this.arrContainers);
    this.storage = new Storage();
  }

  init() {
    this.rendering();
    this.addCards();
    this.dnd.dndStart();
  }

  rendering() {
    this.arrContainers.push(new Container('todo'));
    this.arrContainers.push(new Container('progress'));
    this.arrContainers.push(new Container('done'));
    this.arrContainers.forEach((item) => {
      this.field.append(item.elem);
    });
  }

  addCards() {
    Object.entries(this.storage.store).length === 0
      ? this.addDefaultCard()
      : this.addStoreCard();
  }

  addStoreCard() {
    this.arrContainers.forEach((item) => {
      this.storage.store[item.name].forEach((el) => {
        item.createCard(el.text, el.id);
      });
    });
  }

  addDefaultCard() {
    this.arrContainers.forEach((item) => {
      item.createDefaultCards();
    });
  }
}
