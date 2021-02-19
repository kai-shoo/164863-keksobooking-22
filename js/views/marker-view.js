/* eslint-disable no-undef */
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

class MarkerView {
  addHandlerAttachInput(handler) {
    this.map.on('load', () => this.renderMainPin(handler));
  }

  addHandlerRenderMarkers(handler) {
    this.createGroup();
    this.map.on('load', handler);
  }

  addHandlerShowPopup(handler) {
    this._markersGroup.on('click', handler);
  }

  createGroup() {
    this._markersGroup = L.featureGroup().addTo(this.map);
  }

  bindPopup(popup) {
    this.marker.bindPopup(popup);
  }

  togglePopup(marker) {
    marker.getPopup().togglePopup();
  }

  renderMainPin(handler) {
    const mapCenter = this.map.getCenter();

    this.mainMarker = L.marker(mapCenter, {
      draggable: true,
      icon: L.icon(ICON_MAIN_PIN),
    });
    this.mainMarker.addTo(this.map);
    this.mainMarker.on('move', handler);
  }

  renderMarker(lat, lng) {
    const marker = L.marker(
      { lat: lat, lng: lng },
      {
        icon: L.icon(ICON_PIN),
      },
    ).addTo(this._markersGroup);

    this.map.addLayer(marker);

    this.marker = marker;
  }
}

export default new MarkerView();
