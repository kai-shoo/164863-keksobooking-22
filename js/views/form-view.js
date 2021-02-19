class FormView {
  constructor() {
    this._parentEl = document.querySelector('.ad-form');
    this._fieldsets = document.querySelectorAll('.ad-form__element');
    this._filterContainer = document.querySelector('.map__filters');
    this._filters = document.querySelectorAll('.map__filter');
    this._features = document.querySelector('.map__features');

    this._addressField = document.querySelector('#address');
    this._addressField.addEventListener('keydown', (e) => e.preventDefault());
  }

  addHandlerToggle(handler) {
    window.addEventListener('DOMContentLoaded', handler);
  }

  toggleFormsEnability() {
    this._parentEl.classList.toggle('ad-form--disabled');
    this._fieldsets.forEach(
      (fieldset) => (fieldset.disabled = !fieldset.disabled),
    );

    this._filterContainer.classList.toggle('map__filters--disabled');
    this._features.disabled = !this._features.disabled;
    this._filters.forEach((filter) => (filter.disabled = !filter.disabled));
  }

  set addressValue(coords) {
    const { lat, lng } = coords;
    this._addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

export default new FormView();
