import { getMocks } from './get-mocks.js';

const advertMocks = getMocks();

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const cardsFragment = document.createDocumentFragment();

advertMocks.forEach((ad) => {
  const cardEl = cardTemplate.cloneNode(true);

  cardEl.querySelector('.popup__title').textContent = ad.offer.title;
  cardEl.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardEl.querySelector('.popup__text--price').textContent = ad.offer.price;

  cardEl.querySelector('.popup__type').textContent = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  }[ad.offer.type];

  cardEl.querySelector(
    '.popup__text--capacity',
  ).textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей.`;

  cardEl.querySelector(
    '.popup__text--time',
  ).textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  const featuresClasses = ad.offer.features
    .slice()
    .map((feature) => `popup__feature--${feature}`);

  cardEl.querySelectorAll('.popup__feature').forEach((featureNode) => {
    let isContains = false;
    for (const item of featuresClasses) {
      if (featureNode.classList.contains(item)) isContains = true;
    }
    if (!isContains) featureNode.remove();
  });

  cardEl.querySelector('.popup__description').textContent =
    ad.offer.description;

  const popupPhotoTemplate = cardEl.querySelector('.popup__photo').cloneNode();

  cardEl.querySelector('.popup__photo').remove();

  ad.offer.photos.forEach((photo) => {
    const newPhoto = popupPhotoTemplate.cloneNode();

    newPhoto.src = `${photo}`;
    cardEl.querySelector('.popup__photos').appendChild(newPhoto);
  });

  cardEl.querySelector('.popup__avatar').src = ad.author.avatar;

  cardsFragment.append(cardEl);
});

const mapContainer = document.querySelector('#map-canvas');

mapContainer.append(cardsFragment.querySelector('.popup:nth-child(5)'));
