import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.createModal();
    this.modal.addEventListener('click', (e) => this.closeClick(e));
  }

  createModal() {
    this.modal = createElement(`<div class="modal"><div class="modal__overlay"></div><div class="modal__inner"><div class="modal__header"><button type="button" class="modal__close"><img src="/assets/images/icons/cross-icon.svg" alt="close-icon" /></button><h3 class="modal__title"></h3></div><div class="modal__body"></div></div></div>`);
  }

  setBody(content) {
    let body = this.modal.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(content);
  }

  setTitle(text) {
    let title = this.modal.querySelector('.modal__title');
    title.textContent = text;
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.modal);
    this.keyCloseEventListner = (e) => this.modalCloseKey(e);
    document.addEventListener('keydown', this.keyCloseEventListner);
  }

  close() {
    document.removeEventListener('keydown', this.keyCloseEventListner);
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
  }

  closeClick(e) {
    if (e.target.closest('.modal__close')) {
      this.close();
    }
  }

  modalCloseKey(e) {
    if (e.code === 'Escape') {
      this.close();
    }
  }
}
