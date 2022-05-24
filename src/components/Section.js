export default class Section {
  constructor({renderer}, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(renderedItems) {
    this.clear();
    renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}