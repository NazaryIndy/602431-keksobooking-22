import { getIntegerRandom, getFloatRandom, getRandomArrayElement, getRandomArray } from './util.js';

const MIN_X = 35.65000;
const MAX_X = 35.70000;
const MIN_Y = 139.70000;
const MAX_Y = 139.80000;
const MIN_PRICE = 1;
const MAX_PRICE = 100;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_USER = 1;
const MAX_USER = 8;
const MIN_GUESTS = 1;
const MAX_GUESTS = 20;
const ADS_COUNT = 8;

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createAuthor = () => {
  return {
    avatar: `img/avatars/user0${getIntegerRandom(MIN_USER, MAX_USER)}.png`,
  };
};

const createOffer = (location) => {
  return {
    title: 'Предложение',
    address: `${location.x}, ${location.y}`,
    price: getIntegerRandom(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES),
    rooms: getIntegerRandom(MIN_ROOMS, MAX_ROOMS),
    guests: getIntegerRandom(MIN_GUESTS, MAX_GUESTS),
    checkin: getRandomArrayElement(CHECKIN_TIME),
    checkout: getRandomArrayElement(CHECKOUT_TIME),
    features: getRandomArray(FEATURES),
    description: 'Описание будет добавлено позже',
    photos: getRandomArray(PHOTOS),
  };
};

const createLocation = () => {
  return {
    x: getFloatRandom(MIN_X, MAX_X, 5),
    y: getFloatRandom(MIN_Y, MAX_Y, 5),
  }
};

const createAd = () => {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location: location,
  }
};

const offersAvailable = new Array(ADS_COUNT).fill(null).map(() => createAd());
offersAvailable;
