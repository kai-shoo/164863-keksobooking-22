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

  const avatar = popup.querySelector('.popup__avatar');
  data.author.avatar ? (avatar.src = data.author.avatar) : avatar.remove();

  const title = popup.querySelector('.popup__title');
  data.offer.title ? (title.textContent = data.offer.title) : title.remove();

  const address = popup.querySelector('.popup__text--address');
  data.offer.address
    ? (address.textContent = data.offer.address)
    : address.remove();

  const price = popup.querySelector('.popup__text--price');
  data.offer.price ? (price.textContent = data.offer.price) : price.remove();

  const type = popup.querySelector('.popup__type');
  data.offer.type ? (type.textContent = TYPE[data.offer.type]) : type.remove();

  const capacity = popup.querySelector('.popup__text--capacity');
  data.offer.rooms && data.offer.guests
    ? (capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.guests} гостей.`)
    : capacity.remove();

  const time = popup.querySelector('.popup__text--time');
  data.offer.checkin && data.offer.checkout
    ? (time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`)
    : time.remove();

  const featuresNodes = popup.querySelectorAll('.popup__feature');

  if (data.offer.features === 0) {
    featuresNodes.remove();
  }

  if (data.offer.features.length !== 0) {
    const featuresClasses = data.offer.features.map(function (feature) {
      return `popup__feature popup__feature--${feature}`;
    });
    keepElementsByClassFromArr(featuresClasses, featuresNodes);
  }

  const description = popup.querySelector('.popup__description');
  data.offer.description
    ? (description.textContent = data.offer.description)
    : description.remove();

  const photoTemplate = popup.querySelector('.popup__photo');
  photoTemplate.remove();

  const photoContainer = popup.querySelector('.popup__photos');
  if (data.offer.photos.length !== 0) {
    data.offer.photos.forEach(function (photo) {
      const newPhoto = photoTemplate.cloneNode();
      newPhoto.src = `${photo}`;
      photoContainer.appendChild(newPhoto);
    });
  }

  if (data.offer.photos.length === 0) {
    photoContainer.remove();
  }

  fragment.append(popup);

  return fragment;
};
