import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const LAT = 35.6817;
export const LNG = 139.753882;
const ZOOM = 10;
const parentEl = document.querySelector('#map-canvas');
const filter = document.querySelector('.map__filters-container');

export const addHandlerLoad = function (handler) {
  window.addEventListener('DOMContentLoaded', handler);
};

export const addHandlerAttachInput = function (handler) {
  markerMain.on('move add', handler);
};

export const addHandlerRenderMarker = function (handler) {
  map.on('load', handler);
};

const createMap = function () {
  const map = L.map(parentEl);
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

export const centerMap = function () {
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

export const renderErrorLoadAds = function () {
  const markup = `
    <div class="error__message-marker">
      <p>Ошибка загрузки!</p>
    </div>`;
  filter.innerHTML = '';
  filter.insertAdjacentHTML('afterbegin', markup);
};

export const map = createMap();
export const markerMain = L.marker({ lat: LAT, lng: LNG }, { draggable: true });
export const markerGroup = L.featureGroup().addTo(map);
