/*eslint-disable  no-useless-catch*/

import { AJAX as exchangeData } from './util.js';

const URL = 'https://22.javascript.pages.academy/keksobooking';

export const state = {};

export const loadAds = async function () {
  const data = await exchangeData(`${URL}/data`);
  state.ads = data;
};

export const sendAds = function (data) {
  return exchangeData(URL, data);
};

export const filterAds = function (mask) {
  const filteredData = state.ads.filter(function (ad) {
    if (ad.offer.type && ad.offer.type !== mask.type && mask.type !== 'any') {
      return false;
    }

    if (
      ad.offer.rooms &&
      ad.offer.rooms !== +mask.rooms &&
      mask.rooms !== 'any'
    ) {
      return false;
    }

    if (
      ad.offer.guests &&
      ad.offer.guests !== +mask.guests &&
      mask.guests !== 'any'
    ) {
      return false;
    }

    if (
      ad.offer.price &&
      (ad.offer.price < mask.price[0] || ad.offer.price > mask.price[1])
    ) {
      return false;
    }

    if (ad.offer.features.length !== 0 && mask.features.length !== 0) {
      const isContainsAllFeature = mask.features.every(function (feature) {
        return ad.offer.features.includes(feature);
      });

      return isContainsAllFeature;
    }

    return true;
  });
  return filteredData;
};
