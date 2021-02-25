import * as model from './model.js';
import * as mapView from './views/map-view.js';
import * as formView from './views/form-view.js';
import * as markerView from './views/marker-view.js';
import * as popupView from './views/popup-view.js';
import * as pageView from './views/page-view.js';

const controlForm = function () {};

const controlMap = function () {
  mapView.setView();
  markerView.renderMarkerMain(mapView.markerMain);

  formView.toggleFormsEnability();
};

const controlMarkerMain = function () {
  const coords = mapView.markerMain.getLatLng();
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
    mapView.renderErrorLoadAds();
  }
};

const controlSubmit = async function (evt) {
  try {
    evt.preventDefault();
    const data = new FormData(evt.target);
    await model.sendAds(data);

    const coords = { lat: mapView.LAT, lng: mapView.LNG };
    formView.addressValue(coords);
    pageView.renderSuccess();
    formView.refreshForm();
  } catch (err) {
    pageView.renderError(err.message);
  }
};

const init = function () {
  formView.addHandlerToggle(controlForm);
  mapView.addHandlerLoad(controlMap);
  markerView.addHandlerShowPopup(controlPopup);
  mapView.addHandlerAttachInput(controlMarkerMain);
  mapView.addHandlerRenderMarker(controlMarker);
  formView.addHandlerSubmit(controlSubmit);
};

init();
