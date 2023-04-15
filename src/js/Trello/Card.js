import { v4 as uuid } from 'uuid';

export default class Card {
  constructor(name, text, id = uuid()) {
    this.parentName = name;
    this.elem = null;
    this.id = id;
    this.closeListener = null;
    this.create(text);
    this.registerEvents();
  }

  create(text) {
    this.elem = document.createElement('div');
    this.elem.className = 'card';
    this.elem.setAttribute('draggable', 'true');
    this.elem.dataset.id = this.id;
    this.elem.dataset.parent = this.parentName;
    this.elem.textContent = text;
    this.elem.insertAdjacentHTML(
      'beforeend',
      `<span class="card-close"><i class="fa-solid fa-xmark"></i></span>`
    );
  }

  registerEvents() {
    this.elem.addEventListener('mouseover', this.onMouseOver.bind(this));
    this.elem.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.elem
      .querySelector('.card-close')
      .addEventListener('click', this.onCloseCard.bind(this));
  }

  onMouseOver() {
    this.elem.querySelector('.card-close').classList.add('active');
  }

  onMouseOut() {
    this.elem.querySelector('.card-close').classList.remove('active');
  }

  addCloseCardListener(callback) {
    this.closeListener = callback;
  }

  removeCloseCardListener() {
    this.elem
      .querySelector('.card-close')
      .addEventListener('click', this.onCloseCard);
    this.closeListener = null;
  }

  onCloseCard(e) {
    e.preventDefault();
    this.closeListener.call(null, this.elem.dataset.id);
  }
}
