import * as model from './model.js';
import * as mapView from './views/map-view.js';
import * as formView from './views/form-view.js';
import * as markerView from './views/marker-view.js';
import * as popupView from './views/popup-view.js';
import * as pageView from './views/page-view.js';
import * as filterView from './views/filter-view.js';
import debounce from '../../node_modules/lodash-es/debounce.js';

const RERENDER_DELAY = 500;
const ADS_MAX = 10;

const controlForm = function () {};

const controlMap = function () {
  mapView.center();
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
    pageView.renderSuccess();
    formView.refresh();
    filterView.refresh();
    mapView.center();
    mapView.markerMain.setLatLng(coords);
  } catch (err) {
    pageView.renderError();
  }
};

const controlFilterChange = function () {
  const filterMask = filterView.getFilterMask();
  const filteredAds = model.filterAds(filterMask).slice(0, ADS_MAX);

  mapView.markerGroup.clearLayers();
  mapView.map.closePopup();
  mapView.center();
  markerView.renderMarkers(filteredAds);
};

const controlButtonReset = function () {
  formView.refresh();
  filterView.refresh();
  mapView.center();

  const coords = { lat: mapView.LAT, lng: mapView.LNG };
  mapView.markerMain.setLatLng(coords);
};

const init = function () {
  formView.addHandlerToggle(controlForm);
  mapView.addHandlerLoad(controlMap);
  markerView.addHandlerShowPopup(controlPopup);
  mapView.addHandlerAttachInput(controlMarkerMainMove);
  mapView.addHandlerRenderMarker(controlMarker);
  formView.addHandlerSubmit(controlSubmit);
  formView.addHandlerButtonReset(controlButtonReset);
  filterView.addHandlerChange(debounce(controlFilterChange, RERENDER_DELAY));
};

init();
