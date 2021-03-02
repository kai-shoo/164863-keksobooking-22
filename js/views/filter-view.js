const filtersForm = document.querySelector('.map__filters');
const type = document.querySelector('#housing-type');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const price = document.querySelector('#housing-price');
const featuresFieldset = document.querySelector('#housing-features');

const PRICE_TO_RANGE = {
  any: [0],
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000],
};

export const addHandlerChange = function (handler) {
  filtersForm.addEventListener('input', handler);
};

export const getFilterMask = function () {
  const checkedFeatures = Array.from(
    featuresFieldset.querySelectorAll(':checked'),
  ).map((feature) => feature.value);

  return {
    price: PRICE_TO_RANGE[price.value],
    type: type.value,
    rooms: rooms.value,
    guests: guests.value,
    features: checkedFeatures,
  };
};

export const refresh = function () {
  filtersForm.reset();
};

// {
//   "author": {
//     "avatar": "img/avatars/user03.png"
//   },
//   "offer": {
//     "title": "Небольшая лавочка в парке",
//     "address": "Chiyoda-ku, Tōkyō-to 102-0091",
//     "price": 100,
//     "type": "bungalow",
//     "rooms": 0,
//     "guests": 0,
//     "checkin": "0:00",
//     "checkout": "0:00",
//     "features": [],
//     "description": "Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.",
//     "photos": []
//   },
//   "location": {
//     "lat": 35.71628235346422,
//     "lng": 139.51163649559024
//   }
// }
