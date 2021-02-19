/* eslint-disable no-undef */
const LAT = 35.6817;
const LNG = 139.753882;
const ZOOM = 13;

class MapView {
  constructor() {
    this._lat = LAT;
    this._lng = LNG;
  }

  addHandlerLoad(handler) {
    window.addEventListener('DOMContentLoaded', () => this._createMap(handler));
  }

  _createMap(handler) {
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on('load', handler);

    this.map.setView(
      {
        lat: this._lat,
        lng: this._lng,
      },
      ZOOM,
    );
  }
}

export default new MapView();
