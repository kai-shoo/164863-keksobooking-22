/*eslint-disable  no-useless-catch*/

import { AJAX } from './util.js';

const URL = 'https://22.javascript.pages.academy/keksobooking/data';

export const state = {};

export const loadAds = async function () {
  try {
    const data = await AJAX(URL);
    state.ads = data;
  } catch (err) {
    throw err;
  }
};
