import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { renderOffers } from './offer.js';
import { compareOffers, filterOffers } from './map-form.js';
import { adForm, addressInput } from './ad-form.js';
import { enableForm } from './util.js';

const OFFERS_TO_RENDER_NUMBER = 10;
const TOKIO_COORDINATES = {
  lat: 35.652832,
  lng: 139.839478,
};
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

const setDefaultCoordinates = () => {
  mainMarker.setLatLng(TOKIO_COORDINATES);
  setAddresValue(TOKIO_COORDINATES);
};

const setMainPinMarker = () => {
  mainMarker.setLatLng({TOKIO_COORDINATES});
};

const formatAddressString = ({lat, lng}) => {
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

const setAddresValue = ({lat, lng}) => {
  addressInput.value = formatAddressString({lat, lng});
};

const clearMarkers = () => {
  markers.clearLayers();
};

const map = L.map('map-canvas')
  .on('load', () => {
    enableForm(adForm, 'ad-form');
    setAddresValue(TOKIO_COORDINATES);
  })
  .setView(TOKIO_COORDINATES, 10);

const markers = new L.LayerGroup().addTo(map);

addressInput.defaultValue = formatAddressString(TOKIO_COORDINATES);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH , MAIN_PIN_HEIGHT],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
});

const mainMarker = L.marker(
  TOKIO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

mainMarker.on('moveend', (evt) => {
  setAddresValue(evt.target.getLatLng());
});

const addOffersToMap = (data) => {
  const offers = data
    .slice()
    .sort(compareOffers)
    .filter(filterOffers)
    .slice(0, OFFERS_TO_RENDER_NUMBER);
  const offersCards = renderOffers(offers).children;

  offers
    .forEach(({location}, index) => {
      const icon = L.icon({
        iconUrl: './img/pin.svg',
        iconSize: [PIN_WIDTH, PIN_HEIGHT],
        iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
      });

      const marker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon,
        },
      );

      marker
        .addTo(markers)
        .bindPopup(offersCards[index],
          {
            keepInView: true,
          },
        );
    });
};

export { setDefaultCoordinates, addOffersToMap, clearMarkers, setMainPinMarker };
