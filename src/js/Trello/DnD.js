export default class DnD {
  constructor(field, containers) {
    this.field = field;
    this.arrContainers = containers;
    this.dragEl = null;
    this.shift = null;
    this.fantomEl = null;
    this.eventMove = this.onMouseMove.bind(this);
    this.eventUp = this.onMouseUp.bind(this);
  }

  dndStart() {
    this.arrContainers.forEach((item) => {
      item.elem
        .querySelector('.container-drop')
        .addEventListener('mousedown', this.onMouseDown.bind(this));
    });
  }

  onMouseDown(e) {
    e.preventDefault();
    if (!e.target.classList.contains('card')) {
      return;
    }
    this.dragEl = e.target;
    this.dragEl.style.width = e.target.offsetWidth + 'px';
    this.shift = {
      x: e.clientX - this.dragEl.getBoundingClientRect().left,
      y: e.clientY - this.dragEl.getBoundingClientRect().top,
    };
    this.dragEl.style.left = e.pageX - this.shift.x + 'px';
    this.dragEl.style.top = e.pageY - this.shift.y + 'px';

    if (!this.fantomEl) {
      this.fantomEl = document.createElement('div');
      this.fantomEl.className = 'fantom';
      this.fantomEl.style.width = e.target.offsetWidth + 'px';
      this.fantomEl.style.height = e.target.offsetHeight + 'px';
      this.dragEl.before(this.fantomEl);
    }
    this.dragEl.classList.add('dragged');
    document.addEventListener('mouseup', this.eventUp);
    document.addEventListener('mousemove', this.eventMove);
  }

  onMouseMove(e) {
    if (!this.dragEl) {
      return;
    }
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    this.dragEl.style.left = e.pageX - this.shift.x + 'px';
    this.dragEl.style.top = e.pageY - this.shift.y + 'px';

    if (e.target.classList.contains('container-drop')) {
      if (e.target.children.length === 1) {
        this.fantomEl.remove();
        e.target.append(this.fantomEl);
        e.target.firstElementChild.classList.remove('active');
      } else {
        return;
      }
    }

    if (e.target.classList.contains('card')) {
      const isLocationUp = this.isPositionUp(
        e.target.offsetTop,
        e.target.offsetHeight,
        e.clientY
      );
      // eslint-disable-next-line prettier/prettier
      if (isLocationUp && e.target.previousElementSibling.classList.contains('fantom')) {
        return;
      }
      if (
        !isLocationUp &&
        e.target.nextElementSibling &&
        e.target.nextElementSibling.classList.contains('fantom')
      ) {
        return;
      }
      this.fantomEl.remove();
      isLocationUp
        ? e.target.before(this.fantomEl)
        : e.target.after(this.fantomEl);
    }
  }

  onMouseUp() {
    if (!this.fantomEl || !this.dragEl) {
      return;
    }
    document.removeEventListener('mousemove', this.eventMove);
    const containerPast = this.arrContainers.find(
      (item) => item.name === this.dragEl.dataset.parent
    );
    const card = containerPast.deleteCard(this.dragEl);
    const containerCurrent = this.arrContainers.find(
      (item) => item.name === this.fantomEl.closest('.container').title
    );
    const arrCardsEl = Array.from(containerCurrent.dropEl.children);
    const idx = arrCardsEl.findIndex(
      (item) => item.className === this.fantomEl.className
    );
    containerCurrent.addCard(card, idx);
    this.dragEl.style.left = 0;
    this.dragEl.style.top = 0;
    this.fantomEl.before(this.dragEl);
    this.dragEl.classList.remove('dragged');
    this.fantomEl.remove();
    this.dragEl = null;
    this.fantomEl = null;
    this.arrContainers.forEach((item) => item.isEmptyDrop());
    document.removeEventListener('mouseup', this.eventUp);
  }

  isPositionUp(elemTop, elemheight, clientY) {
    if (clientY > elemTop && clientY < elemTop + elemheight / 2) {
      return true;
    }
    return false;
  }
}
