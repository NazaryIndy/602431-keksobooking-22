import { disableForm, enableForm } from './forms-controller.js';
import { renderOffers } from './offer.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setType } from './map-form.js';

const OFFERS_TO_RENDER_NUMBER = 10;
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
const addressInput = adForm.querySelector('#address');

getData(
  (offers) => {
    addOffersToMap(offers);
    setType(() => {
      markers.clearLayers();
      addOffersToMap(offers)
    });
  },
  (errorMessage) => {
    disableForm(mapFiltersForm, 'map__filters');
    showAlert(errorMessage);
  },
);

const enableApp = () => {
  enableForm(adForm, 'ad-form');
  enableForm(mapFiltersForm, 'map__filters');
};

const disableApp = () => {
  disableForm(adForm, 'ad-form');
  disableForm(mapFiltersForm, 'map__filters');
};

const resetDefaultCoordinates = () => {
  marker.setLatLng(TOKIO_COORDINATES);
  setAddresValue(TOKIO_COORDINATES);
}

disableApp();

const setAddresValue = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    setAddresValue(TOKIO_COORDINATES);
    enableApp();
  })
  .setView(TOKIO_COORDINATES, 10);

const markers = new L.LayerGroup().addTo(map);

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

const getOfferRank = ({offer}) => {
  const typeInput = mapFiltersForm.querySelector('[name="housing-type"]');

  let rank = 0;
  if (typeInput.value === 'any') {
    rank += 1;
  } else if (offer.type === typeInput.value) {
    rank += 1;
  }

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
}

const addOffersToMap = (data) => {
  const offers = data
    .slice()
    .sort(compareOffers)
    .filter((offer) => getOfferRank(offer) !== 0)
    .slice(0, OFFERS_TO_RENDER_NUMBER);
  const offersCards = renderOffers(offers).children;

  offers
    .forEach(({location}, index) => {
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
        .addTo(markers)
        .bindPopup(offersCards[index],
          {
            keepInView: true,
          },
        );
    });
}

export { resetDefaultCoordinates };
