import * as model from './model.js';
import mapView from './views/map-view.js';
import formView from './views/form-view.js';
import markerView from './views/marker-view.js';
import popupView from './views/popup-view.js';

const controlForm = function () {
  formView.toggleFormsEnability();
};

const controlMap = function () {
  formView.toggleFormsEnability();
};

const controlMainPin = function () {
  const coords = markerView.mainMarker.getLatLng();
  formView.addressValue = coords;
};

const controlPopup = function (event) {
  const clickedMarker = event.propagatedFrom;

  const clickedAd = model.state.find((ad) => ad.marker === clickedMarker);

  popupView.renderPopup(clickedMarker, clickedAd);
};

const controlMarker = function () {
  model.state.forEach((ad) => {
    const { x, y } = ad.location;
    markerView.renderMarker(x, y);
    ad.marker = markerView.marker;
  });
};

const init = function () {
  [popupView, markerView, mapView].forEach(
    (objView) => (objView.map = model.map),
  );

  formView.addHandlerToggle(controlForm);
  mapView.addHandlerLoad(controlMap);
  markerView.addHandlerRenderMarkers(controlMarker);
  markerView.addHandlerShowPopup(controlPopup);
  markerView.addHandlerAttachInput(controlMainPin);
};

init();
