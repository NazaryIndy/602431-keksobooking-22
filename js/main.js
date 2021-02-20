import './ad-form.js';
import { renderOffers } from './offer.js';

const mapCanvas = document.querySelector('.map__canvas');

const offerCardElements = renderOffers();

mapCanvas.appendChild(offerCardElements.children[0]);
