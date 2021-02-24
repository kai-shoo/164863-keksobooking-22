/*eslint-disable  no-useless-catch*/

import * as model from './model.js';
import * as mapView from './views/map-view.js';
import * as formView from './views/form-view.js';
import * as markerView from './views/marker-view.js';
import * as popupView from './views/popup-view.js';

const controlForm = function () {};

const controlMap = function () {
  mapView.createMap();
  formView.toggleFormsEnability();
};

const controlMainPin = function () {
  const coords = this.getLatLng();
  formView.addressValue(coords);
};

const controlPopup = function (event) {
  const clickedMarker = event.propagatedFrom;
  const clickedAd = model.state.ads.find((ad) => ad.marker === clickedMarker);
  popupView.renderPopup(clickedMarker, clickedAd);
};

const controlMarker = async function () {
  try {
    await model.loadAds();
    model.state.ads.forEach((ad) => {
      const { lat, lng } = ad.location;
      ad.marker = markerView.createMarker(lat, lng);
      mapView.addToGroup(ad.marker);
    });
  } catch (err) {
    mapView.renderError();
  }
};

const init = function () {
  formView.addHandlerToggle(controlForm);
  mapView.addHandlerLoad(controlMap);
  markerView.addHandlerRenderMarkers(controlMarker);
  markerView.addHandlerShowPopup(controlPopup);
  markerView.addHandlerAttachInput(controlMainPin);
};

init();
