class FormView {
  constructor() {
    this._parentEl = document.querySelector('.ad-form');
    this._fieldsets = document.querySelectorAll('.ad-form__element');
    this._filterContainer = document.querySelector('.map__filters');
    this._filters = document.querySelectorAll('.map__filter');
    this._features = document.querySelector('.map__features');
    this._buttonSubmit = document.querySelector('.ad-form__submit');

    this._titleInput = document.querySelector('#title');
    this._addressInput = document.querySelector('#address');
    this._typeInput = document.querySelector('#type');
    this._priceInput = document.querySelector('#price');
    this._timeinInput = document.querySelector('#timein');
    this._timeoutInput = document.querySelector('#timeout');

    this._capacityInput = document.querySelector('#capacity');
    this._capacityOptions = this._capacityInput.querySelectorAll('option');
    this._roomInput = document.querySelector('#room_number');
    this._toggleForbiddenOptions();
    // 1) Проверить какие селекты могут быть и убрать лишнии

    this._typeToMinPrice = {
      bungalow: 0,
      flat: 1000,
      house: 5000,
      palace: 10000,
    };

    this.toggleFormsEnability();
    this._addressInput.disabled = true;

    this._addHandlerChangeType();
    this._addHandlerChangeTime();
    this._addHandlerFormSubmit();

    this._addHandlerTitleValidity();
    this._addHandlerPriceValidity();
    this._addHandlerGuestsValidity();
  }

  addHandlerToggle(handler) {
    window.addEventListener('DOMContentLoaded', handler);
  }

  _addHandlerTitleValidity() {
    ['input', 'focus'].forEach((event) => {
      this._titleInput.addEventListener(event, () => {
        this._titleInput.setCustomValidity('');
        if (this._titleInput.validity.valid) {
          return;
        }

        if (this._titleInput.validity.tooShort) {
          this._titleInput.setCustomValidity(
            'Заголовок должнен состоять минимум из 30-ти символов',
          );
          this._titleInput.reportValidity();
        }
        if (this._titleInput.validity.tooLong) {
          this._titleInput.setCustomValidity(
            'Заголовок не должен превышать 100 символов',
          );
          this._titleInput.reportValidity();
        }
        if (this._titleInput.validity.valueMissing) {
          this._titleInput.setCustomValidity('Обязательное поле');
          this._titleInput.reportValidity();
        }
      });
    });
  }

  _addHandlerGuestsValidity() {
    // 1) Определить какие значения допустимы
    // 2) Поставить disable на вредные
    // 3) Проверить валидити и выдать сообщение in case of what
    this._roomInput.addEventListener('change', () => {
      this._toggleForbiddenOptions();
      this._validateGuests();
    });

    this._capacityInput.addEventListener('change', () => {
      this._toggleForbiddenOptions();
      this._validateGuests();
    });
  }

  _toggleForbiddenOptions() {
    this._capacityOptions.forEach((option) => {
      if (this._roomInput.value === '100') {
        option.disabled = option.value !== '0' ? true : false;

        // capacity == option.value && option.disable =true datasetisdisabled
      }

      if (this._roomInput.value !== '100') {
        option.disabled = this._roomInput.value < option.value ? true : false;
        if (option.value === '0') {
          option.disabled = true;
        }
      }

      if (this._capacityInput.value === option.value) {
        this._capacityInput.dataset.isDisabled = option.disabled;
      }
    });
  }

  _validateGuests() {
    if (this._capacityInput.dataset.isDisabled === 'true') {
      this._capacityInput.setCustomValidity(
        'Комнат должно быть больше или столько же сколько гостей',
      );

      if (this._roomInput.value === '100') {
        this._capacityInput.setCustomValidity(
          '100 комнат может быть только "для не гостей"',
        );
      }

      this._capacityInput.reportValidity();
    }

    if (this._capacityInput.dataset.isDisabled === 'false') {
      this._capacityInput.setCustomValidity('');
    }
  }

  _addHandlerPriceValidity() {
    this._priceInput.addEventListener('input', this._validatePrice.bind(this));

    this._priceInput.addEventListener('focus', this._validatePrice.bind(this));
  }

  _validatePrice() {
    this._priceInput.setCustomValidity('');
    if (this._priceInput.validity.valid) {
      return;
    }

    if (this._priceInput.validity.rangeUnderflow) {
      this._priceInput.setCustomValidity(
        `Цена не должна быть меньше ${this._priceInput.getAttribute('min')}`,
      );
      this._priceInput.reportValidity();
    }
    if (this._priceInput.validity.rangeOverflow) {
      this._priceInput.setCustomValidity('Цена не должна превышать 1000000');
      this._priceInput.reportValidity();
    }
    if (this._priceInput.validity.valueMissing) {
      this._priceInput.setCustomValidity('Обязательное поле');
      this._priceInput.reportValidity();
    }
    if (this._priceInput.validity.badInput) {
      this._priceInput.setCustomValidity('Цена должна быть числом');
      this._priceInput.reportValidity();
    }
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
      this._validatePrice();
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

  _addHandlerFormSubmit() {}

  set addressValue(coords) {
    const { lat, lng } = coords;
    this._addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

export default new FormView();
