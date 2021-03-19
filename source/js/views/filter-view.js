const filtersForm = document.querySelector('.map__filters');
const type = document.querySelector('#housing-type');
const rooms = document.querySelector('#housing-rooms');
const guests = document.querySelector('#housing-guests');
const price = document.querySelector('#housing-price');
const featuresFieldset = document.querySelector('#housing-features');

const priceTypeToRange = {
  any: [0],
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000],
};

export const addHandlerChange = function (handler) {
  filtersForm.addEventListener('input', handler);
  filtersForm.addEventListener('reset', handler);
};

export const getFilterMask = function () {
  const checkedFeatures = Array.from(
    featuresFieldset.querySelectorAll(':checked'),
  ).map((feature) => feature.value);

  return {
    price: priceTypeToRange[price.value],
    type: type.value,
    rooms: rooms.value,
    guests: guests.value,
    features: checkedFeatures,
  };
};

export const refresh = function () {
  filtersForm.reset();
};
