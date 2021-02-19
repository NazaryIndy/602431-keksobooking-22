import { renderOffers } from './offer.js';

const mapCanvas = document.querySelector('.map__canvas');

const offersTemplate = renderOffers();

mapCanvas.appendChild(offersTemplate.children[0]);
