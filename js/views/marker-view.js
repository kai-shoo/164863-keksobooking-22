/* eslint-disable no-undef */
import { map, markerGroup } from './map-view.js';

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

export const addHandlerShowPopup = function (handler) {
  markerGroup.on('click', handler);
};

export const bindPopup = function (popup) {
  marker.bindPopup(popup);
};

export const togglePopup = function (marker) {
  marker.getPopup().togglePopup();
};

export const renderMarkerMain = function (marker) {
  marker.setIcon(L.icon(ICON_MAIN_PIN)).addTo(map);
};

export const createMarker = function (lat, lng) {
  const marker = L.marker(
    { lat: lat, lng: lng },
    {
      icon: L.icon(ICON_PIN),
    },
  );

  return marker;
};
