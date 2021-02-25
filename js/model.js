/*eslint-disable  no-useless-catch*/

import { AJAX } from './util.js';

const URL = 'https://22.javascript.pages.academy/keksobooking';

export const state = {};

export const loadAds = async function () {
  try {
    const data = await AJAX(`${URL}/data`);
    state.ads = data;
  } catch (err) {
    throw err;
  }
};

export const sendAds = function (data) {
  try {
    return AJAX(URL, data);
  } catch (err) {
    throw err;
  }
};
