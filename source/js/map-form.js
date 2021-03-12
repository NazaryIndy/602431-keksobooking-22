import { disableForm } from './util.js';

const mapFiltersForm = document.querySelector('.map__filters');
const typeInput = mapFiltersForm.querySelector('[name="housing-type"]');
const priceInput = mapFiltersForm.querySelector('[name="housing-price"]');
const roomsInput = mapFiltersForm.querySelector('[name="housing-rooms"]');
const guestsInput = mapFiltersForm.querySelector('[name="housing-guests"]');
const PRICE_LOW = 'low';
const PRICE_MIDDLE = 'middle';
const PRICE_HIGH = 'high';
const DEFAULT_FILTER_VALUE = 'any';

const resetMapForm = () => {
  mapFiltersForm.reset();
};

disableForm(mapFiltersForm, 'map__filters');

const comparePrice = (offerPrice, mapPrice) => {
  return ((mapPrice === DEFAULT_FILTER_VALUE) ||
    (offerPrice < 10000 && mapPrice === PRICE_LOW) ||
    ((offerPrice >= 10000 && offerPrice < 50000) && mapPrice === PRICE_MIDDLE) ||
    (offerPrice >= 50000 && mapPrice === PRICE_HIGH));
};

const compareGuests = (offerGuests, mapGuests) => {
  return ((mapGuests === DEFAULT_FILTER_VALUE) ||
    (offerGuests === +mapGuests) ||
    (offerGuests === 0 && mapGuests === '0'));
};

const getOfferRank = ({offer}) => {
  const checkedFeatures = [...mapFiltersForm.querySelector('#housing-features')
    .querySelectorAll('input[type="checkbox"]:checked')];

  let rank = 0;

  if (offer.type === typeInput.value || typeInput.value === DEFAULT_FILTER_VALUE) {
    rank += 1;
  }
  if (comparePrice(offer.price, priceInput.value)) {
    rank += 1;
  }
  if (offer.rooms.toString() === roomsInput.value || roomsInput.value === DEFAULT_FILTER_VALUE) {
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

  return ((offer.type === typeInput.value || typeInput.value === DEFAULT_FILTER_VALUE) &&
    (comparePrice(offer.price, priceInput.value)) &&
    (offer.rooms.toString() === roomsInput.value || roomsInput.value === DEFAULT_FILTER_VALUE) &&
    (compareGuests(offer.guests, guestsInput.value)) &&
    (checkedFeatures.every((feature) => offer.features.includes(feature.defaultValue))));
};

const setFilters = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    cb();
  });
};

export { mapFiltersForm, resetMapForm, comparePrice, compareGuests, compareOffers, filterOffers, setFilters };
