/* eslint-disable no-undef */
/* global L:readonly */

const LAT = 35.6817;
const LNG = 139.753882;
const ZOOM = 10;
const parentEl = document.querySelector('#map-canvas');

export const map = L.map(parentEl);
export const markerGroup = L.featureGroup().addTo(map);

export const addHandlerLoad = function (handler) {
  window.addEventListener('DOMContentLoaded', () => createMap(handler));
};

export const createMap = function (handler) {
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on('load', handler);

  map.setView(
    {
      lat: LAT,
      lng: LNG,
    },
    ZOOM,
  );
};

export const addToGroup = function (item) {
  item.addTo(markerGroup);
};
