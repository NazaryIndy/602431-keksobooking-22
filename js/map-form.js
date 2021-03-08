import { disableForm } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const typeInput = mapFiltersForm.querySelector('[name="housing-type"]');
const priceInput = mapFiltersForm.querySelector('[name="housing-price"]');
const roomsInput = mapFiltersForm.querySelector('[name="housing-rooms"]');
const guestsInput = mapFiltersForm.querySelector('[name="housing-guests"]');

const resetMapForm = () => {
  mapFiltersForm.reset();
};

disableForm(mapFiltersForm, 'map__filters');

const comparePrice = (offerPrice, mapPrice) => {
  if ((mapPrice === 'any') ||
    (offerPrice < 10000 && mapPrice === 'low') ||
    ((offerPrice >= 10000 && offerPrice < 50000) && mapPrice === 'middle') ||
    (offerPrice >= 50000 && mapPrice === 'high')) {
    return true;
  }

  return false;
};

const compareGuests = (offerGuests, mapGuests) => {
  if ((mapGuests === 'any') ||
    (offerGuests === +mapGuests) ||
    (offerGuests === 0 && mapGuests === '0')) {
    return true;
  }

  return false;
};

const getOfferRank = ({offer}) => {
  const checkedFeatures = [...mapFiltersForm.querySelector('#housing-features')
    .querySelectorAll('input[type="checkbox"]:checked')];

  let rank = 0;

  if (offer.type === typeInput.value || typeInput.value === 'any') {
    rank += 1;
  }
  if (comparePrice(offer.price, priceInput.value)) {
    rank += 1;
  }
  if (offer.rooms.toString() === roomsInput.value || roomsInput.value === 'any') {
    rank += 1;
  }
  if (compareGuests(offer.guests, guestsInput.value)) {
    rank += 1;
  }
  rank = rank + checkedFeatures.length;

  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const filterOffers = ({offer}) => {
  const checkedFeatures = [...mapFiltersForm.querySelector('#housing-features')
    .querySelectorAll('input[type="checkbox"]:checked')];

  if ((offer.type === typeInput.value || typeInput.value === 'any') &&
    (comparePrice(offer.price, priceInput.value)) &&
    (offer.rooms.toString() === roomsInput.value || roomsInput.value === 'any') &&
    (compareGuests(offer.guests, guestsInput.value)) &&
    (checkedFeatures.every(feature=> offer.features.includes(feature.defaultValue)))) {
    return offer;
  }
  return;
};

const setFilters = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    cb();
  });
};

export { mapFiltersForm, resetMapForm, comparePrice, compareGuests, compareOffers, filterOffers, setFilters };
