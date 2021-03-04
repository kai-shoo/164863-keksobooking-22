const SPECIAL_ROOM_NUMBER = '100';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const parentEl = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('.ad-form__element');
const filterContainer = document.querySelector('.map__filters');
const filters = document.querySelectorAll('.map__filter');
const features = document.querySelector('.map__features');

const titleInput = document.querySelector('#title');
const addressInput = document.querySelector('#address');
const typeInput = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeinInput = document.querySelector('#timein');
const timeoutInput = document.querySelector('#timeout');

const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');
const imagesInput = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo');

const capacityInput = document.querySelector('#capacity');
const capacityOptions = capacityInput.querySelectorAll('option');
const roomInput = document.querySelector('#room_number');

const buttonReset = document.querySelector('.ad-form__reset');

export const addHandlerToggle = function (handler) {
  window.addEventListener('DOMContentLoaded', handler);
};

const addHandlerTitleValidity = function () {
  titleInput.addEventListener('focus', validateTitle);
  titleInput.addEventListener('input', validateTitle);
};

const addHandlerAvatarUpload = function () {
  avatarInput.addEventListener(
    'change',
    renderImagePreview.bind(avatarInput, avatarPreview),
  );
};

const addHandlerImagesUpload = function () {
  imagesInput.addEventListener(
    'change',
    renderImagePreview.bind(imagesInput, imagesPreview),
  );
};

const renderImagePreview = function (preview) {
  const file = this.files[0];
  const fileName = file.name.toLowerCase();

  const isMatch = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (isMatch) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = new Image(40, 40);
      image.src = reader.result;

      preview.innerHTML = '';
      preview.append(image);
    });

    reader.readAsDataURL(file);
  }
};

const validateTitle = function () {
  titleInput.setCustomValidity('');
  if (titleInput.validity.valid) {
    return;
  }

  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(
      'Заголовок должнен состоять минимум из 30-ти символов',
    );
  }
  if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity(
      `Заголовок не должен превышать ${SPECIAL_ROOM_NUMBER} символов`,
    );
  }
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  }

  titleInput.reportValidity();
};

const addHandlerGuestsValidity = function () {
  roomInput.addEventListener('change', () => {
    toggleForbiddenOptions();
    validateGuests();
  });

  capacityInput.addEventListener('change', () => {
    toggleForbiddenOptions();
    validateGuests();
  });
};

const toggleForbiddenOptions = function () {
  capacityOptions.forEach((option) => {
    if (roomInput.value === SPECIAL_ROOM_NUMBER) {
      option.disabled = option.value !== '0' ? true : false;
    }

    if (roomInput.value !== SPECIAL_ROOM_NUMBER) {
      option.disabled = roomInput.value < option.value ? true : false;
      if (option.value === '0') {
        option.disabled = true;
      }
    }

    if (capacityInput.value === option.value) {
      capacityInput.dataset.isDisabled = option.disabled;
    }
  });
};

const validateGuests = function () {
  if (capacityInput.dataset.isDisabled === 'true') {
    capacityInput.setCustomValidity(
      'Комнат должно быть больше или столько же сколько гостей',
    );

    if (roomInput.value === SPECIAL_ROOM_NUMBER) {
      capacityInput.setCustomValidity(
        `${SPECIAL_ROOM_NUMBER} комнат может быть только "для не гостей"`,
      );
    }

    capacityInput.reportValidity();
  }

  if (capacityInput.dataset.isDisabled === 'false') {
    capacityInput.setCustomValidity('');
  }
};

const addHandlerPriceValidity = function () {
  priceInput.addEventListener('input', validatePrice);
  priceInput.addEventListener('focus', validatePrice);
};

export const addHandlerButtonReset = function (handler) {
  buttonReset.addEventListener('click', handler);
};

const validatePrice = function () {
  priceInput.setCustomValidity('');
  if (priceInput.validity.valid) {
    return;
  }

  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(
      `Цена не должна быть меньше ${priceInput.getAttribute('min')}`,
    );
  }
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Цена не должна превышать 1000000');
  }
  if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  }
  if (priceInput.validity.badInput) {
    priceInput.setCustomValidity('Цена должна быть числом');
  }

  priceInput.reportValidity();
};

const addHandlerChangeTime = function () {
  [timeinInput, timeoutInput].forEach((input) =>
    input.addEventListener('change', () => {
      timeinInput.value = timeoutInput.value = input.value;
    }),
  );
};

const addHandlerChangeType = function () {
  typeInput.addEventListener('change', () => {
    const selected = typeInput.value;
    const minPrice = typeToMinPrice[selected];
    priceInput.setAttribute('min', minPrice);
    priceInput.setAttribute('placeholder', minPrice);
    validatePrice();
  });
};

export const toggleFormsEnability = function () {
  parentEl.classList.toggle('ad-form--disabled');
  fieldsets.forEach((fieldset) => (fieldset.disabled = !fieldset.disabled));

  filterContainer.classList.toggle('map__filters--disabled');
  features.disabled = !features.disabled;
  filters.forEach((filter) => (filter.disabled = !filter.disabled));
};

export const setAddressValue = function (coords) {
  const { lat, lng } = coords;
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

export const addHandlerSubmit = function (handler) {
  parentEl.addEventListener('submit', handler);
};

export const refresh = function () {
  parentEl.reset();
};

toggleFormsEnability();
addressInput.setAttribute('readonly', 'readonly');

toggleForbiddenOptions();

addHandlerChangeType();
addHandlerChangeTime();

addHandlerTitleValidity();
addHandlerPriceValidity();
addHandlerGuestsValidity();
addHandlerButtonReset();
addHandlerAvatarUpload();
addHandlerImagesUpload();
