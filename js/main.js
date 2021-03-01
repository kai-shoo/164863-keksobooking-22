import * as model from './model.js';
import * as mapView from './views/map-view.js';
import * as formView from './views/form-view.js';
import * as markerView from './views/marker-view.js';
import * as popupView from './views/popup-view.js';
import * as pageView from './views/page-view.js';
import * as filterView from './views/filter-view.js';

const ADS_MAX = 10;

const controlForm = function () {};

const controlMap = function () {
  mapView.centerMap();
  markerView.renderMarkerMain(mapView.markerMain);

  formView.toggleFormsEnability();
};

const controlMarkerMainMove = function () {
  const coords = mapView.markerMain.getLatLng();
  formView.setAddressValue(coords);
};

const controlPopup = function (event) {
  const clickedMarker = event.propagatedFrom;
  const clickedAd = model.state.ads.find((ad) => {
    if (
      ad.location.lat === clickedMarker.getLatLng().lat &&
      ad.location.lng === clickedMarker.getLatLng().lng
    ) {
      return true;
    }
  });
  popupView.renderPopup(clickedMarker, clickedAd);
};

const controlMarker = async function () {
  try {
    await model.loadAds();
    const currentAds = model.state.ads.slice(0, ADS_MAX);
    markerView.renderMarkers(currentAds);
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
    formView.setAddressValue(coords);
    pageView.renderSuccess();
    formView.refreshForm();
  } catch (err) {
    pageView.renderError(err.message);
  }
};

const controlFilterChange = function () {
  const filterMask = filterView.getFilterMask();
  const filterdAds = model.filterAds(filterMask);

  mapView.markerGroup.clearLayers();
  mapView.map.closePopup();
  mapView.centerMap();
  markerView.renderMarkers(filterdAds);
};

const init = function () {
  formView.addHandlerToggle(controlForm);
  mapView.addHandlerLoad(controlMap);
  markerView.addHandlerShowPopup(controlPopup);
  mapView.addHandlerAttachInput(controlMarkerMainMove);
  mapView.addHandlerRenderMarker(controlMarker);
  formView.addHandlerSubmit(controlSubmit);
  filterView.addHandlerChange(controlFilterChange);
};

init();
