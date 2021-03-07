import { disableForm, enableForm, setAddresValue } from './forms-controller.js';
import { renderOffers } from './offer.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

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

try {
  getData(
    (offers) => addOffersToMap(offers),
    () => showAlert('Не удалось загрузить предложения. Попробуйте позже'),
  );
} catch (err) {
  showAlert('Не удалось загрузить предложения. Попробуйте позже');
}

const enableApp = () => {
  enableForm(adForm, 'ad-form');
  enableForm(mapFiltersForm, 'map__filters');
};

const disableApp = () => {
  disableForm(adForm, 'ad-form');
  disableForm(mapFiltersForm, 'map__filters');
};

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

const addOffersToMap = (offers) => {
  const offersCards = renderOffers(offers).children;

  offers.forEach(({location}, index) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
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
      .addTo(map)
      .bindPopup(offersCards[index],
        {
          keepInView: true,
        },
      );
  });
}

export { marker };
