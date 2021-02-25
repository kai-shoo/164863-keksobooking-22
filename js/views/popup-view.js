import { keepElementsByClassFromArr } from '../util.js';

const TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
};

const template = document
  .querySelector('#card')
  .content.querySelector('.popup');

export const renderPopup = function (marker, ad) {
  const popup = generateMarkup(ad);

  marker.bindPopup(popup).togglePopup();
  marker.unbindPopup();
};

const generateMarkup = function (data) {
  const fragment = document.createDocumentFragment();

  const popup = template.cloneNode(true);

  popup.querySelector('.popup__avatar').src = data.author.avatar;
  popup.querySelector('.popup__title').textContent = data.offer.title;
  popup.querySelector('.popup__text--address').textContent = data.offer.address;
  popup.querySelector('.popup__text--price').textContent = data.offer.price;
  popup.querySelector('.popup__type').textContent = TYPE[data.offer.type];

  popup.querySelector(
    '.popup__text--capacity',
  ).textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей.`;

  popup.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;

  const featuresNodes = popup.querySelectorAll('.popup__feature');

  if (data.offer.features === 0) {
    featuresNodes.remove();
  }

  if (data.offer.features.length !== 0) {
    const featuresClasses = data.offer.features.map(
      (feature) => `popup__feature popup__feature--${feature}`,
    );
    keepElementsByClassFromArr(featuresClasses, featuresNodes);
  }

  popup.querySelector('.popup__description').textContent =
    data.offer.description;

  const photoTemplate = popup.querySelector('.popup__photo');
  photoTemplate.remove();

  const photoContainer = popup.querySelector('.popup__photos');
  data.offer.photos.forEach((photo) => {
    const newPhoto = photoTemplate.cloneNode();
    newPhoto.src = `${photo}`;
    photoContainer.appendChild(newPhoto);
  });

  fragment.append(popup);

  return fragment;
};
