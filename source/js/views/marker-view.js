/* eslint-disable no-undef */
import { map, markerGroup, addToGroup } from './map-view.js';

const ICON_MAIN_PIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
};
const ICON_PIN = {
  iconUrl: './img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -31],
};

export const addHandlerPopupShow = function (handler) {
  markerGroup.on('click', handler);
};

export const renderMarkerMain = function (marker) {
  marker.setIcon(L.icon(ICON_MAIN_PIN)).addTo(map);
};

export const renderMarkers = function (data) {
  data.forEach(function (ad) {
    const { lat, lng } = ad.location;
    const marker = createMarker(lat, lng);
    addToGroup(marker);
  });
};

export const createMarker = function (lat, lng) {
  return L.marker(
    { lat: lat, lng: lng },
    {
      icon: L.icon(ICON_PIN),
    },
  );
};
