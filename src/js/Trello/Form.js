export default class Form {
  constructor() {
    this.elem = null;
    this.onSubmitListener = null;
    this.onResetListener = null;
    this.create();
    this.registerEvents();
  }

  create() {
    this.elem = document.createElement('form');
    this.elem.className = 'add-form';
    this.elem.insertAdjacentHTML(
      'beforeend',
      `<input name="task" type="text" placeholder="добавте текст задачи" />
      <button type="submit" class="btn-form add-form-submit">Добавить</button>
      <button type="reset" class="btn-form add-form-reset"><i class="fa-solid fa-xmark"></i></button>`
    );
  }

  registerEvents() {
    this.elem.addEventListener('submit', this.onSubmit.bind(this));
    this.elem.addEventListener('reset', this.onReset.bind(this));
  }

  addSubmitListener(callback) {
    this.onSubmitListener = callback;
  }

  addResetListener(callback) {
    this.onResetListener = callback;
  }

  onSubmit(e) {
    e.preventDefault();
    this.onSubmitListener.call(null);
  }

  onReset() {
    this.onResetListener.call(null);
  }
}
