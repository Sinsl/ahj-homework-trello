import taskText from './defaultTask';
import Card from './Card';
import Form from './Form';

export default class Container {
  constructor(name) {
    this.name = name;
    this.elem = null;
    this.addTaskEl = null;
    this.arrCards = [];
    this.dropEl = null;
    this.form = new Form();
    this.init();
  }

  init() {
    this.create();
    this.isEmptyDrop();
    this.registerEvents();
  }

  create() {
    this.elem = document.createElement('div');
    this.elem.className = `container container-${this.name}`;
    this.elem.setAttribute('title', this.name);
    this.elem.insertAdjacentHTML(
      'beforeend',
      `<h3>${this.name}</h3>
      <div class="container-drop">
        <div class="isempty">Нет задач</div>
      </div>
      <div class="container-add">
        <a href="" class="add-link"><i class="fa-solid fa-plus"></i>Добавить задачу</a>
      </div>`
    );
    this.dropEl = this.elem.querySelector('.container-drop');
    this.addTaskEl = this.elem.querySelector('.add-link');
    this.elem.querySelector('.container-add').prepend(this.form.elem);
  }

  registerEvents() {
    this.addTaskEl.addEventListener('click', this.onClickAdd.bind(this));
    this.form.addSubmitListener(this.onSubmit.bind(this));
    this.form.addResetListener(this.onReset.bind(this));
  }

  onClickAdd(e) {
    e.preventDefault();
    this.addTaskEl.classList.add('hide');
    this.form.elem.classList.add('active');
  }

  onSubmit() {
    this.createCard(this.form.elem.task.value);
    this.form.elem.reset();
    this.addTaskEl.classList.remove('hide');
    this.form.elem.classList.remove('active');
  }

  onReset() {
    this.addTaskEl.classList.remove('hide');
    this.form.elem.classList.remove('active');
  }

  createCard(text, id) {
    const card = new Card(this.name, text, id);
    this.arrCards.push(card);
    this.dropEl.append(card.elem);
    card.addCloseCardListener(this.onCloseCard.bind(this));
    this.isEmptyDrop();
  }

  createDefaultCards() {
    let count = 0;
    while (count < 3) {
      const idx = Math.floor(Math.random() * taskText.length);
      this.createCard(taskText[idx]);
      count += 1;
    }
    this.isEmptyDrop();
  }

  onCloseCard(id) {
    const idx = this.arrCards.findIndex((item) => item.elem.dataset.id === id);
    this.arrCards[idx].removeCloseCardListener();
    this.arrCards[idx].elem.remove();
    this.arrCards.splice(idx, 1)[0] = null;
    this.isEmptyDrop();
  }

  isEmptyDrop() {
    const text = this.elem.querySelector('.isempty');
    this.arrCards.length === 0
      ? text.classList.add('active')
      : text.classList.remove('active');
  }

  addCard(card, idx) {
    card.parentName = this.name;
    card.elem.dataset.parent = this.name;
    this.arrCards.splice(idx, 0, card);
  }

  deleteCard(card) {
    const idx = this.arrCards.findIndex((item) => item.id === card.dataset.id);
    const cardObj = this.arrCards.splice(idx, 1)[0];
    this.isEmptyDrop();
    return cardObj;
  }
}
