import { disableForm, enableForm } from './forms-controller.js';
import { generateOffers } from './data.js';
import { renderOffers } from './offer.js';

const TOKIO_COORDINATES = {
  lat: 35.652832,
  lng: 139.839478,
};
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;

const L = window.L;
const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
const addressField = adForm.querySelector('#address');

const offers = generateOffers();
const offersCard = renderOffers(offers).children;

const enableApp = () => {
  enableForm(adForm, 'ad-form');
  enableForm(mapFiltersForm, 'map__filters');
};

const disableApp = () => {
  disableForm(adForm, 'ad-form');
  disableForm(mapFiltersForm, 'map__filters');
};

const setAddresValue = ({lat, lng}) => {
  addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

addressField.readOnly = true;

disableApp();

const map = L.map('map-canvas')
  .on('load', () => {
    setAddresValue(TOKIO_COORDINATES);
    enableApp();
  })
  .setView(TOKIO_COORDINATES, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH , MAIN_PIN_HEIGHT],
  iconAnchor: [MAIN_PIN_WIDTH / 2, MAIN_PIN_HEIGHT],
});

const marker = L.marker(
  TOKIO_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

marker.on('moveend', (evt) => {
  setAddresValue(evt.target.getLatLng());
});

offers.forEach(({location}, index) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [PIN_WIDTH, PIN_HEIGHT],
    iconAnchor: [PIN_WIDTH / 2, PIN_HEIGHT],
  });

  const marker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(offersCard[index],
      {
        keepInView: true,
      },
    );
});
