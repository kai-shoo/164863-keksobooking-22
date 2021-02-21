class FormView {
  constructor() {
    this._parentEl = document.querySelector('.ad-form');
    this._fieldsets = document.querySelectorAll('.ad-form__element');
    this._filterContainer = document.querySelector('.map__filters');
    this._filters = document.querySelectorAll('.map__filter');
    this._features = document.querySelector('.map__features');

    this._addressInput = document.querySelector('#address');
    this._typeInput = document.querySelector('#type');
    this._priceInput = document.querySelector('#price');
    this._timeinInput = document.querySelector('#timein');
    this._timeoutInput = document.querySelector('#timeout');

    this._typeToMinPrice = {
      bungalow: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
    };

    this.toggleFormsEnability();

    this._addHandlerChangeType();
    this._addHandlerChangeTime();
    this._inactivateInput(this._addressInput);
  }

  addHandlerToggle(handler) {
    window.addEventListener('DOMContentLoaded', handler);
  }

  _inactivateInput(input) {
    ['keydown', 'mousedown'].forEach((event) =>
      input.addEventListener(event, (e) => e.preventDefault()),
    );
    input.setAttribute('tabindex', -1);
  }

  _addHandlerChangeTime() {
    [this._timeinInput, this._timeoutInput].forEach((input) =>
      input.addEventListener('change', () => {
        this._timeinInput.value = this._timeoutInput.value = input.value;
      }),
    );
  }

  _addHandlerChangeType() {
    this._typeInput.addEventListener('change', () => {
      const selected = this._typeInput.value;
      const minPrice = this._typeToMinPrice[selected];
      this._priceInput.setAttribute('min', minPrice);
      this._priceInput.setAttribute('placeholder', minPrice);
    });
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
    this._addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

export default new FormView();
