import { disableForm, enableForm } from './forms-controller.js';
import { generateOffers } from './data.js';
import { renderOffers } from './offer.js';

const TOKYO_LAT = 35.652832;
const TOKYO_LNG = 139.839478;
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

addressField.readOnly = true;

disableApp();

const map = L.map('map-canvas')
  .on('load', () => {
    addressField.value = `${TOKYO_LAT.toFixed(5)}, ${TOKYO_LNG.toFixed(5)}`;
    enableApp();
  })
  .setView({
    lat: TOKYO_LAT,
    lng: TOKYO_LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
).addTo(map);

marker.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

offers.forEach(({location}, index) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
